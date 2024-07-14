import React from 'react';
import Badge from '../atoms/Badge';

const getStatusBadgeVariant = (status) => {
  switch (status.toLowerCase()) {
    case "active":
      return "success";
    case "draft":
      return "warning";
    case "archived":
      return "secondary";
    case "kontiert":
      return "info";
    case "pending":
      return "default";
    default:
      return "default";
  }
};

const StatusBadge = ({ status }) => (
  <Badge variant={getStatusBadgeVariant(status)}>{status}</Badge>
);

export default StatusBadge;