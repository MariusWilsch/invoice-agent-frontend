import React from 'react';

const FormField = ({ label, id, children, className }) => (
  <div className={`flex flex-col ${className}`}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {children}
  </div>
);

export default FormField;