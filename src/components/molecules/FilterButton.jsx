import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLanguage } from "../../contexts/LanguageContext";
import { Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FilterButton = ({ onFilter, onClearFilter, isFilterActive }) => {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  const handleFilter = () => {
    if (dateRange.from && dateRange.to) {
      onFilter(dateRange);
      setIsOpen(false);
    }
  };

  const handleClearFilter = () => {
    setDateRange({ from: null, to: null });
    onClearFilter();
  };

  const translations = {
    de: {
      filter: "Filter",
      applyFilter: "Filter anwenden",
      clearFilter: "Filter löschen",
      filterActive: "Filter aktiv",
    },
    en: {
      filter: "Filter",
      applyFilter: "Apply Filter",
      clearFilter: "Clear Filter",
      filterActive: "Filter Active",
    },
  };

  const t = translations[language];

  return (
    <div className="flex items-center space-x-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant={isFilterActive ? "secondary" : "outline"} className="relative">
            <Filter className="mr-2 h-4 w-4" />
            {t.filter}
            {isFilterActive && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 h-3 w-3 bg-primary rounded-full" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
          />
          <div className="p-3 border-t flex justify-between">
            <Button onClick={handleClearFilter} variant="outline" className="mr-2">
              {t.clearFilter}
            </Button>
            <Button onClick={handleFilter}>
              {t.applyFilter}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterButton;
