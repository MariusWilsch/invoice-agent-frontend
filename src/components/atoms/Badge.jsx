import React from 'react';
import { Badge as UiBadge } from "@/components/ui/badge";

const Badge = ({ variant, children }) => (
  <UiBadge variant={variant}>{children}</UiBadge>
);

export default Badge;