import React from 'react';
import { Badge as UiBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const Badge = ({ variant, children, className }) => {
  const variantStyles = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    secondary: "bg-purple-100 text-purple-800",
    info: "bg-blue-100 text-blue-800",
  };

  return (
    <UiBadge 
      variant="outline" 
      className={cn(variantStyles[variant] || variantStyles.default, className)}
    >
      {children}
    </UiBadge>
  );
};

export default Badge;