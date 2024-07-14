import React from 'react';
import FormLabel from '../atoms/FormLabel';
import CreatableSelect from 'react-select/creatable';

const SelectField = ({ id, label, options, value, onChange }) => {
  const selectOptions = options.map(option => ({
    value: option.value,
    label: option.label
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
        placeholder={`Select ${label}...`}
        isClearable
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default SelectField;