import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { supabase } from '@/integrations/supabase/supabase';

export const handleDownloadWithStamp = async (invoice) => {
  try {
    // Download the original PDF
    const { data, error } = await supabase
      .storage
      .from('invoices') // Replace with your actual bucket name
      .download(invoice.public_url.split('/').pop()); // Extract filename from URL

    if (error) {
      throw error;
    }

    // Load the PDF document
    const pdfDoc = await PDFDocument.load(await data.arrayBuffer());

    // Add a new page for the stamp
    const page = pdfDoc.addPage();

    // Get the font
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Define the stamp content
    const stampContent = [
      { label: 'Eingegangen am:', value: invoice.eingegangen_am },
      { label: 'Fällig am:', value: invoice.faellig_am },
      { label: 'Konto:', value: invoice.konto },
      { label: 'EV/VP:', value: invoice.ev_vp },
      { label: 'Belegtext:', value: invoice.belegtext },
      { label: 'Ticket Number:', value: invoice.ticket_number },
      { label: 'Kommentar:', value: invoice.kommentar },
      { label: 'Skonto:', value: `${invoice.skonto}%` },
      { label: 'Kostenstelle:', value: invoice.kostenstelle },
      { label: 'VB:', value: invoice.vb },
    ];

    // Set up the table
    const margin = 50;
    const cellPadding = 5;
    const fontSize = 12;
    const lineHeight = fontSize * 1.2;
    let y = page.getHeight() - margin;

    // Draw the table
    stampContent.forEach(({ label, value }) => {
      page.drawText(label, { x: margin, y, font, fontSize });
      page.drawText(value || 'N/A', { x: page.getWidth() / 2, y, font, fontSize });
      y -= lineHeight;
    });

    // Save the PDF
    const pdfBytes = await pdfDoc.save();

    // Create a Blob from the PDF bytes
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${invoice.invoice_number || 'invoice'}_with_stamp.pdf`;
    link.click();
  } catch (error) {
    console.error('Error downloading and modifying PDF:', error);
    // You might want to show an error message to the user here
  }
};