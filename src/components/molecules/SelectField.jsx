import React from 'react';
import FormLabel from '../atoms/FormLabel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SelectField = ({ id, label, options, value, onChange }) => {
  return (
    <div className="flex flex-col mb-4 min-w-[200px]">
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`Select ${label}...`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectField;