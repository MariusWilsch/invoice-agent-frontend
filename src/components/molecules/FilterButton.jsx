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
      {isFilterActive && (
        <Badge variant="secondary" className="flex items-center">
          {t.filterActive}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 ml-2 p-0"
            onClick={handleClearFilter}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
    </div>
  );
};

export default FilterButton;
