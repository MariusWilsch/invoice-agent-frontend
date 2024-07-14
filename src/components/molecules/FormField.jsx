import React from 'react';
import FormLabel from '../atoms/FormLabel';
import FormInput from '../atoms/FormInput';

const FormField = ({ id, label, placeholder }) => (
  <div className="flex flex-col mb-4 min-w-[200px]">
    <FormLabel htmlFor={id}>{label}</FormLabel>
    <FormInput id={id} placeholder={placeholder} />
  </div>
);

export default FormField;