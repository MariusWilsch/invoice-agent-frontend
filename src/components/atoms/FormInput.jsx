import React from 'react';
import { Input } from "@/components/ui/input";

const FormInput = ({ label, id, type, placeholder, value, onChange, required, disabled }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full"
        disabled={disabled}
      />
    </div>
  );
};

export default FormInput;