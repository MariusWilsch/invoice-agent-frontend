import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLanguage } from "../../contexts/LanguageContext";
import { Filter } from "lucide-react";

const FilterButton = ({ onFilter }) => {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  const handleFilter = () => {
    if (dateRange.from && dateRange.to) {
      onFilter(dateRange);
      setIsOpen(false);
    }
  };

  const translations = {
    de: {
      filter: "Filter",
      applyFilter: "Filter anwenden",
    },
    en: {
      filter: "Filter",
      applyFilter: "Apply Filter",
    },
  };

  const t = translations[language];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          {t.filter}
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
          <Button onClick={handleFilter} className="w-full">
            {t.applyFilter}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterButton;
