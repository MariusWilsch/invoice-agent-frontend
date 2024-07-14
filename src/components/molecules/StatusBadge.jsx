import React from 'react';
import Badge from '../atoms/Badge';

const getStatusBadgeVariant = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Draft":
      return "warning";
    case "Archived":
      return "secondary";
    default:
      return "default";
  }
};

const StatusBadge = ({ status }) => (
  <Badge variant={getStatusBadgeVariant(status)}>{status}</Badge>
);

export default StatusBadge;