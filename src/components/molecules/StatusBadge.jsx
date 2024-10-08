import React from "react";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "../../hooks/useTranslations";

const StatusBadge = ({ status }) => {
  const t = useTranslations();

  const getStatusInfo = (status) => {
    switch (status.toLowerCase()) {
      case "kontiert":
        return { color: "bg-green-500", text: t.kontiert };
      case "unkontiert":
        return { color: "bg-red-500", text: t.unkontiert };
      case "empfangen":
        return { color: "bg-yellow-500", text: t.empfangen };
      case "bezahlt":
        return { color: "bg-blue-500", text: t.bezahlt };
      default:
        return { color: "bg-gray-500", text: "Unknown" };
    }
  };

  const { color, text } = getStatusInfo(status);

  return <Badge className={`${color} text-white`}>{text}</Badge>;
};

export default StatusBadge;
