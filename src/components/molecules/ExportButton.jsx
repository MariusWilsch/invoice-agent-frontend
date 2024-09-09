import React from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/index.js";
import { format } from "date-fns";
import { useLanguage } from "../../contexts/LanguageContext";

const ExportButton = ({ dateFilter }) => {
  const { language } = useLanguage();

  const handleExport = async () => {
    try {
      let query = supabase.from('invoices_dev').select();

      if (dateFilter.from && dateFilter.to) {
        query = query
          .gte('invoice_date', format(dateFilter.from, 'yyyy-MM-dd'))
          .lte('invoice_date', format(dateFilter.to, 'yyyy-MM-dd'));
      }

      const { data, error } = await query.csv();

      if (error) throw error;

      downloadCSV(data);
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
    <Button variant="outline" onClick={handleExport}>
      {language === 'de' ? 'Exportieren' : 'Export'}
    </Button>
  );
};

export default ExportButton;
