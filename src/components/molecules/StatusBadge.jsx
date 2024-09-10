import React from "react";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "../../hooks/useTranslations";

const StatusBadge = ({ status }) => {
  const t = useTranslations();

  const getStatusInfo = (status) => {
    console.log(status);
    switch (status.toLowerCase()) {
      case "kontiert":
        return { color: "bg-green-500", text: t.kontiert };
      case "unkontiert":
        return { color: "bg-red-500", text: t.unkontiert };
      case "empfangen":
        return { color: "bg-yellow-500", text: t.empfangen };
      default:
        return { color: "bg-red-500", text: "Error" };
    }
  };

  const { color, text } = getStatusInfo(status);

  return <Badge className={`${color} text-white`}>{text}</Badge>;
};

export default StatusBadge;
