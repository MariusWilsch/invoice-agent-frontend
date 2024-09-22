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
import { cn } from "@/lib/utils";

const DateRangePicker = ({ onConfirm }) => {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const t = useTranslations();

  const handleSelect = (range) => {
    // Handle cases where range might be undefined
    if (range && (range.from || range.to)) {
      setDateRange({
        from: range.from || dateRange.from,
        to: range.to || dateRange.to,
      });
    } else {
      setDateRange({ from: null, to: null });
    }
  };

  const handleConfirm = () => {
    if (dateRange.from && dateRange.to) {
      onConfirm(dateRange);
    }
  };

  const handleClear = () => {
    setDateRange({ from: null, to: null });
    onConfirm({ from: null, to: null });
  };

  return (
    <div className="inline-block">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !dateRange.from && !dateRange.to && "text-muted-foreground"
            )}
          >
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
            initialFocus
            mode="range"
            defaultMonth={dateRange.from || new Date()}
            selected={dateRange}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
          <div className="p-3 border-t flex justify-end space-x-2">
            <Button onClick={handleClear} variant="outline">
              {t.clear}
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!dateRange.from || !dateRange.to}
            >
              {t.confirm}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
