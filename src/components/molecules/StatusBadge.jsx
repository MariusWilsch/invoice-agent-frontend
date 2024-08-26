import React from 'react';
import Badge from '../atoms/Badge';
import { useLanguage } from '../../contexts/LanguageContext';

const getStatusBadgeVariant = (status) => {
  switch (status.toLowerCase()) {
    case "active":
    case "aktiv":
    case "checked":
    case "kontiert":
      return "success";
    case "draft":
    case "entwurf":
      return "warning";
    case "archived":
    case "archiviert":
      return "secondary";
    case "unchecked":
    case "unkontiert":
    case "empfangen":
      return "default";
    case "pending":
    case "ausstehend":
      return "default";
    default:
      return "default";
  }
};

const StatusBadge = ({ status }) => {
  const { language } = useLanguage();

  const translations = {
    en: {
      "active": "Active",
      "draft": "Draft",
      "archived": "Archived",
      "checked": "Checked",
      "unchecked": "Unchecked",
      "pending": "Pending",
      "empfangen": "Unchecked",
      "kontiert": "Checked",
      "unkontiert": "Unchecked"
    },
    de: {
      "active": "Aktiv",
      "draft": "Entwurf",
      "archived": "Archiviert",
      "checked": "Kontiert",
      "unchecked": "Unkontiert",
      "pending": "Ausstehend",
      "empfangen": "Unkontiert",
      "kontiert": "Kontiert",
      "unkontiert": "Unkontiert"
    }
  };

  const translatedStatus = translations[language][status.toLowerCase()] || status;

  return (
    <Badge variant={getStatusBadgeVariant(status)}>{translatedStatus}</Badge>
  );
};

export default StatusBadge;