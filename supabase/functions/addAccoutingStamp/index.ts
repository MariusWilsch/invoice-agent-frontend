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
}

// Global dummy data
const dummyData: StampData = {
  eingegangen: "2023-05-15",
  faellig: "2023-06-15",
  konto: "1234567890",
  evVp: "EV",
  belegtext: "Invoice #12345",
  ticketnummer: "T-9876",
  kostenstelle: "KS-001",
  vb: "500 EUR",
  skonto: "2%",
  kommentar:
    "This is a sample comment for the accounting stamp. It demonstrates how longer text will be wrapped within the designated comment section of the PDF.",
};

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
): number {
  const fontSize = 12;
  const lineHeight = 30; // Increased for more vertical spacing
  const leftColumnX = margin + 20; // Aligned to left margin
  const rightColumnX = width / 2 + 20; // Fixed position for values

  let currentY = startY;

  const pairs = [
    { key: "Eingegangen am:", value: dummyData.eingegangen },
    { key: "Fällig am:", value: dummyData.faellig },
    { key: "Konto:", value: dummyData.konto },
    { key: "EV/VP:", value: dummyData.evVp },
    { key: "Belegtext:", value: dummyData.belegtext },
    { key: "Ticketnummer:", value: dummyData.ticketnummer },
    { key: "Kostenstelle:", value: dummyData.kostenstelle },
    { key: "VB:", value: dummyData.vb },
    { key: "Skonto:", value: dummyData.skonto },
  ];

  for (const item of pairs) {
    // Draw label (key) with bold font
    page.drawText(item.key, {
      x: leftColumnX,
      y: currentY,
      size: fontSize,
      font: helveticaBoldFont, // Using bold font for labels
      color: rgb(0, 0, 0),
    });

    // Draw value
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
): number {
  const commentHeader = "Kommentar:";
  const headerFontSize = 12;
  const commentFontSize = 10;
  const lineHeight = 14;

  // Add comment header
  page.drawText(commentHeader, {
    x: margin + 20,
    y: startY,
    size: headerFontSize,
    font: helveticaBoldFont,
    color: rgb(0, 0, 0),
  });

  // Draw separator line
  const separatorY = startY - 5;
  page.drawLine({
    start: { x: margin + 20, y: separatorY },
    end: { x: width - margin - 20, y: separatorY },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  // Add comment text with word wrapping
  const maxWidth = width - 2 * (margin + 20);
  let currentY = separatorY - lineHeight;
  let words = dummyData.kommentar.split(" ");
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine + (currentLine ? " " : "") + word;
    const testLineWidth = helveticaFont.widthOfTextAtSize(
      testLine,
      commentFontSize,
    );

    if (testLineWidth > maxWidth) {
      page.drawText(currentLine, {
        x: margin + 20,
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
      x: margin + 20,
      y: currentY,
      size: commentFontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
  }

  return currentY; // Return the final Y position after comment
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

async function createStampedPDF() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.276, 841.890]);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const margin = 50;
  const { width, height } = page.getSize();

  let currentY = height;
  const startY = addTitle(page, helveticaBoldFont, width, currentY, margin);

  currentY = addKeyValuePairs(
    page,
    helveticaFont,
    helveticaBoldFont,
    startY - 20,
    margin,
    width,
  );
  currentY = addCommentSection(
    page,
    helveticaFont,
    helveticaBoldFont,
    currentY - 20,
    margin,
    width,
  );

  const contentHeight = height - currentY;
  drawBorder(page, width, height, margin, contentHeight);

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

Deno.serve(async (req) => {
  // TODO: Implement receiving and using an existing PDF.
  // For now, we're creating an empty PDF with the stamp layout.

  const pdfBytes = await createStampedPDF();

  return new Response(pdfBytes, {
    headers: { "Content-Type": "application/pdf" },
  });
});
