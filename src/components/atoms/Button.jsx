import React from "react";
import { Button as UiButton } from "@/components/ui/button";

const Button = ({ variant, size, onClick, children }) => (
  <UiButton variant={variant} size={size} onClick={onClick}>
    {children}
  </UiButton>
);

export default Button;
