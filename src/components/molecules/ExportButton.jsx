import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/index.js";
import { format } from "date-fns";
import { useLanguage } from "../../contexts/LanguageContext";

const ExportButton = () => {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  const handleExport = async () => {
    if (!dateRange.from || !dateRange.to) {
      alert(language === 'de' ? 'Bitte wählen Sie einen Datumsbereich aus.' : 'Please select a date range.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('invoices_dev')
        .select()
        .rangeGt('invoice_date', `[${format(dateRange.from, 'yyyy-MM-dd')},${format(dateRange.to, 'yyyy-MM-dd')}]`)
        .csv();

      if (error) throw error;

      downloadCSV(data);
      setIsOpen(false);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert(language === 'de' ? 'Fehler beim Exportieren der CSV-Datei.' : 'Error exporting CSV file.');
    }
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
