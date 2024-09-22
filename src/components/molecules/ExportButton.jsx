import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "../../contexts/LanguageContext";

const ExportButton = ({ dateFilter, onClick, disabled }) => {
  const { language } = useLanguage();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button variant="outline" onClick={handleClick} disabled={disabled}>
      {language === 'de' ? 'Exportieren' : 'Export'}
    </Button>
  );
};

export default ExportButton;
