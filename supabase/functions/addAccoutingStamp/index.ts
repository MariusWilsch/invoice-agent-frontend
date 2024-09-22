import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";
import {
  PDFDocument,
  PDFFont,
  PDFPage,
  rgb,
  StandardFonts,
} from "https://esm.sh/pdf-lib@1.17.1";
import { createClient } from "https://esm.sh/@supabase/supabase-js@latest";
import { authenticateUser } from "../_shared/auth.ts";

// Define the Zod schema for stamp data
const StampDataSchema = z.object({
  eingegangen: z.string().optional(),
  faellig: z.string().optional(),
  konto: z.string().optional(),
  evVp: z.string().optional(),
  belegtext: z.string().optional(),
  ticketnummer: z.string().optional(),
  kostenstelle: z.string().optional(),
  vb: z.string().optional(),
  skonto: z.string().optional(),
  kommentar: z.string().optional(),
  public_url: z.string().url(),
});

// Define the interface for stamp data based on the Zod schema
type StampData = z.infer<typeof StampDataSchema>;

// Helper function to get value or default to "Leer"
function getValueOrDefault(value: string | null | undefined): string {
  return value && value.trim() !== "" ? value : "Leer";
}

function addTitle(
  page: PDFPage,
  helveticaBoldFont: PDFFont,
  width: number,
  height: number,
  margin: number,
): number {
  const titleFontSize = 24;
  const title = "Kontierungsstempel";
  const titleY = height - margin - titleFontSize - 10;

  page.drawText(title, {
    x: margin + 20,
    y: titleY,
    size: titleFontSize,
    font: helveticaBoldFont,
    color: rgb(0, 0, 0),
  });

  const separatorY = titleY - 10;
  page.drawLine({
    start: { x: margin + 20, y: separatorY },
    end: { x: width - margin - 20, y: separatorY },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  return separatorY - 10;
}

function addKeyValuePairs(
  page: PDFPage,
  helveticaFont: PDFFont,
  helveticaBoldFont: PDFFont,
  startY: number,
  margin: number,
  width: number,
  stampData: StampData,
): number {
  const fontSize = 12;
  const lineHeight = 30;
  const leftColumnX = margin + 20;
  const rightColumnX = width / 2 + 20;

  let currentY = startY;

  const pairs = [
    { key: "Eingegangen am:", value: getValueOrDefault(stampData.eingegangen) },
    { key: "Fällig am:", value: getValueOrDefault(stampData.faellig) },
    { key: "Konto:", value: getValueOrDefault(stampData.konto) },
    { key: "EV/VP:", value: getValueOrDefault(stampData.evVp) },
    { key: "Belegtext:", value: getValueOrDefault(stampData.belegtext) },
    { key: "Ticketnummer:", value: getValueOrDefault(stampData.ticketnummer) },
    { key: "Kostenstelle:", value: getValueOrDefault(stampData.kostenstelle) },
    { key: "VB:", value: getValueOrDefault(stampData.vb) },
    { key: "Skonto:", value: getValueOrDefault(stampData.skonto) },
  ];

  for (const item of pairs) {
    page.drawText(item.key, {
      x: leftColumnX,
      y: currentY,
      size: fontSize,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(item.value, {
      x: rightColumnX,
      y: currentY,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    currentY -= lineHeight;
  }

  return currentY;
}

function addCommentSection(
  page: PDFPage,
  helveticaFont: PDFFont,
  helveticaBoldFont: PDFFont,
  startY: number,
  margin: number,
  width: number,
  stampData: StampData,
): number {
  const commentHeader = "Kommentar:";
  const headerFontSize = 12;
  const commentFontSize = 10;
  const lineHeight = 14;
  const textX = margin + 20; // Define a common x-coordinate for title and text

  // Add comment header
  page.drawText(commentHeader, {
    x: textX,
    y: startY,
    size: headerFontSize,
    font: helveticaBoldFont,
    color: rgb(0, 0, 0),
  });

  // Add comment text with word wrapping
  const maxWidth = width - 2 * (margin + 20);
  let currentY = startY - lineHeight;
  let words = getValueOrDefault(stampData.kommentar).split(" ");
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine + (currentLine ? " " : "") + word;
    const testLineWidth = helveticaFont.widthOfTextAtSize(
      testLine,
      commentFontSize,
    );

    if (testLineWidth > maxWidth) {
      page.drawText(currentLine, {
        x: textX,
        y: currentY,
        size: commentFontSize,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      currentY -= lineHeight;
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  // Draw the last line
  if (currentLine) {
    page.drawText(currentLine, {
      x: textX,
      y: currentY,
      size: commentFontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
  }

  return currentY;
}

function drawBorder(
  page: PDFPage,
  width: number,
  height: number,
  margin: number,
  contentHeight: number,
) {
  const borderPadding = 20;
  page.drawRectangle({
    x: margin,
    y: height - contentHeight - margin - borderPadding,
    width: width - 2 * margin,
    height: contentHeight + 2 * borderPadding,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
  });
}

async function createStampedPDF(
  existingPdfDoc: PDFDocument,
  stampData: StampData,
): Promise<Uint8Array> {
  const stampPage = existingPdfDoc.addPage([595.276, 841.890]);
  const helveticaFont = await existingPdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBoldFont = await existingPdfDoc.embedFont(
    StandardFonts.HelveticaBold,
  );

  const margin = 50;
  const { width, height } = stampPage.getSize();

  let currentY = height;
  currentY = addTitle(stampPage, helveticaBoldFont, width, currentY, margin);
  currentY = addKeyValuePairs(
    stampPage,
    helveticaFont,
    helveticaBoldFont,
    currentY - 20,
    margin,
    width,
    stampData,
  );
  currentY = addCommentSection(
    stampPage,
    helveticaFont,
    helveticaBoldFont,
    currentY - 20,
    margin,
    width,
    stampData,
  );

  const contentHeight = height - currentY;
  drawBorder(stampPage, width, height, margin, contentHeight);

  return existingPdfDoc.save();
}

function getCorsHeaders(origin: string) {
  const allowedOrigins = Deno.env.get("ALLOWED_ORIGINS")?.split(",") || [];
  if (allowedOrigins?.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
    };
  }
  return {
    "Access-Control-Allow-Origin": "null",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
  };
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get("Origin") || "");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Handle unsupported methods
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", {
      headers: corsHeaders,
      status: 405,
    });
  }

  // * Authenticate user
  const { error } = await authenticateUser(req);

  if (error) {
    return new Response(error, {
      headers: corsHeaders,
      status: 401,
    });
  }

  // ! Handle POST request
  try {
    const rawData = await req.json();

    // Validate the incoming data
    const validationResult = StampDataSchema.safeParse(rawData);

    if (!validationResult.success) {
      // If validation fails, return a 400 Bad Request with error details
      return new Response(
        JSON.stringify({
          error: "Invalid input data",
          details: validationResult.error.errors,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // If validation succeeds, use the validated data
    const { public_url, ...stampData } = validationResult.data;

    const pdfDoc = await PDFDocument.load(
      await (await fetch(public_url)).arrayBuffer(),
    );
    const stampedPdfBytes = await createStampedPDF(pdfDoc, stampData);

    // * Return the stamped PDF
    return new Response(stampedPdfBytes, {
      headers: { ...corsHeaders, "Content-Type": "application/octet-stream" },
    });
  } catch (error) {
    console.error("Server-side error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
