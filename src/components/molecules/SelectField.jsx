import React from 'react';
import FormLabel from '../atoms/FormLabel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SelectField = ({ id, label, options }) => (
  <div className="flex flex-col mb-4 min-w-[200px]">
    <FormLabel htmlFor={id}>{label}</FormLabel>
    <Select>
      <SelectTrigger id={id} className="mb-4 w-full">
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default SelectField;