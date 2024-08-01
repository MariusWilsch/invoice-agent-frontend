import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useInvoicesDev } from "@/integrations/supabase/index.js";
import { format } from "date-fns";
import { useLanguage } from "../../contexts/LanguageContext";

const ExportButton = () => {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [isOpen, setIsOpen] = useState(false);
  const { data: invoices } = useInvoicesDev();
  const { language } = useLanguage();

  const handleExport = () => {
    if (!dateRange.from || !dateRange.to) {
      alert(language === 'de' ? 'Bitte wählen Sie einen Datumsbereich aus.' : 'Please select a date range.');
      return;
    }

    const filteredInvoices = invoices.filter(invoice => {
      const invoiceDate = new Date(invoice.invoice_date);
      return invoiceDate >= dateRange.from && invoiceDate <= dateRange.to;
    });

    const csvContent = generateCSV(filteredInvoices);
    downloadCSV(csvContent);
    setIsOpen(false);
  };

  const generateCSV = (data) => {
    const headers = ['Ausstellungsdatum', 'Rechnungsnummer', 'Absender', 'Bruttobetrag'];
    const rows = data.map(invoice => [
      invoice.invoice_date,
      invoice.invoice_number,
      Array.isArray(invoice.sender) ? invoice.sender.join(', ') : invoice.sender,
      invoice.amount?.gross_amount || ''
    ]);
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const downloadCSV = (content) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `invoices_${format(new Date(), 'yyyy-MM-dd')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {language === 'de' ? 'Exportieren' : 'Export'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
        />
        <div className="p-3 border-t">
          <Button onClick={handleExport} className="w-full">
            {language === 'de' ? 'CSV exportieren' : 'Export CSV'}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ExportButton;
