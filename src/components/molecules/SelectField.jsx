import React from 'react';
import FormLabel from '../atoms/FormLabel';
import { Combobox } from "@/components/ui/combobox";

const SelectField = ({ id, label, options, value, onChange }) => {
  return (
    <div className="flex flex-col mb-4 min-w-[200px]">
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Combobox
        options={options}
        placeholder={`Select ${label}...`}
        emptyMessage={`No ${label.toLowerCase()} found.`}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectField;