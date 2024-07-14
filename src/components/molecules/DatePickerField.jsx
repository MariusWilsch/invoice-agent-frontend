import React from 'react';
import FormLabel from '../atoms/FormLabel';
import { DatePickerDemo } from "@/components/ui/date-picker";

const DatePickerField = ({ id, label }) => (
  <div className="flex flex-col mb-4 min-w-[200px]">
    <FormLabel htmlFor={id}>{label}</FormLabel>
    <div className="w-full">
      <DatePickerDemo id={id} className="mb-4 w-full" />
    </div>
  </div>
);

export default DatePickerField;