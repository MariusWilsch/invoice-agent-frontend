import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useTranslations } from "../../hooks/useTranslations";

const DateRangePicker = ({ onConfirm }) => {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const t = useTranslations();

  const handleSelect = (date) => {
    if (!dateRange.from) {
      setDateRange({ from: date, to: null });
    } else if (dateRange.from && !dateRange.to) {
      setDateRange({ from: dateRange.from, to: date });
    } else {
      setDateRange({ from: date, to: null });
    }
  };

  const handleConfirm = () => {
    if (dateRange.from && dateRange.to) {
      onConfirm(dateRange);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "LLL dd, y")} -{" "}
                {format(dateRange.to, "LLL dd, y")}
              </>
            ) : (
              format(dateRange.from, "LLL dd, y")
            )
          ) : (
            <span>{t.selectDateRange}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={handleSelect}
          numberOfMonths={2}
        />
        <div className="p-3 border-t">
          <Button onClick={handleConfirm} className="w-full">
            {t.confirm}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;