import React, { useState } from 'react';
import FormLabel from '../atoms/FormLabel';
import CreatableSelect from 'react-select/creatable';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

const SelectField = ({ id, label, options, value, onChange, onEditOption, onDeleteOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectOptions = options.map(option => ({
    value: option.value,
    label: (
      <div className="flex items-center justify-between w-full">
        <span>{option.label}</span>
        {isOpen && (
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEditOption(option);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteOption(option);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    ),
  }));

  const handleChange = (selectedOption) => {
    onChange(selectedOption ? selectedOption.value : null);
  };

  return (
    <div className="flex flex-col mb-4 min-w-[200px]">
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <CreatableSelect
        id={id}
        options={selectOptions}
        value={selectOptions.find(option => option.value === value) || null}
        onChange={handleChange}
        onMenuOpen={() => setIsOpen(true)}
        onMenuClose={() => setIsOpen(false)}
        placeholder={`Select ${label}...`}
        isClearable
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default SelectField;