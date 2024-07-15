import React from 'react';
import Badge from '../atoms/Badge';

const getStatusBadgeVariant = (status) => {
  switch (status.toLowerCase()) {
    case "active":
    case "aktiv":
      return "success";
    case "draft":
    case "entwurf":
      return "warning";
    case "archived":
    case "archiviert":
      return "secondary";
    case "kontiert":
      return "info";
    case "unkontiert":
      return "default";
    case "pending":
    case "ausstehend":
      return "default";
    default:
      return "default";
  }
};

const StatusBadge = ({ status }) => {
  const translatedStatus = {
    "active": "Aktiv",
    "draft": "Entwurf",
    "archived": "Archiviert",
    "kontiert": "Kontiert",
    "unkontiert": "Unkontiert",
    "pending": "Ausstehend",
    "empfangen": "Unkontiert"
  }[status.toLowerCase()] || status;

  return (
    <Badge variant={getStatusBadgeVariant(status)}>{translatedStatus}</Badge>
  );
};

export default StatusBadge;