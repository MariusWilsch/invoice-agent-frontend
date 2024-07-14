import React from 'react';
import { Label } from "@/components/ui/label";

const FormLabel = ({ htmlFor, children }) => (
  <Label htmlFor={htmlFor} className="mb-2">
    {children}
  </Label>
);

export default FormLabel;