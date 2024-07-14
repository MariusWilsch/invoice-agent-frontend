import React from 'react';
import { Input } from "@/components/ui/input";

const FormInput = ({ id, placeholder, className }) => (
  <Input id={id} placeholder={placeholder} className={`mb-4 w-full ${className}`} />
);

export default FormInput;