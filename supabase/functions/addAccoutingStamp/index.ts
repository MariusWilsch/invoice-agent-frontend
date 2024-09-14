import {
  PDFDocument,
  PDFFont,
  PDFPage,
  rgb,
  StandardFonts,
} from "https://esm.sh/pdf-lib@1.17.1";

// Define the interface for stamp data
interface StampData {
  eingegangen: string;
  faellig: string;
  konto: string;
  evVp: string;
  belegtext: string;
  ticketnummer: string;
  kostenstelle: string;
  vb: string;
  skonto: string;
  kommentar: string;
  public_url: string;
}

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
  const textX = margin + 20;  // Define a common x-coordinate for title and text

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

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
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
  // TODO: Check the jwt token of the user if he's authenticated

  // ! Handle POST request
  try {
    const { public_url, ...stampData } = await req.json();
    console.log("Data:", stampData);

    // TODO: Download the PDF from the private bucket

    //! Right now our bucket is public, so we can download it without any problems
    const pdfResponse = await fetch(public_url);
    if (!pdfResponse.ok) {
      throw new Error("Failed to download PDF");
    }

    const pdfBytes = await pdfResponse.arrayBuffer();

    const pdfDoc = await PDFDocument.load(pdfBytes);

    const stampedPdfBytes = await createStampedPDF(pdfDoc, stampData);

    return new Response(stampedPdfBytes, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }
});
