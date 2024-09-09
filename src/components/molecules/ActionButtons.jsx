import React from "react";
import { FileText, Eye, Trash, Stamp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useLanguage } from "../../contexts/LanguageContext";
import { handleDownloadWithStamp } from "@/utils/pdfUtils";

const translations = {
  de: {
    stamp: "Stempel",
    pdf: "PDF",
    view: "Ansehen",
    delete: "Löschen",
    areYouSure: "Sind Sie sicher?",
    deleteWarning:
      "Diese Aktion kann nicht rückgängig gemacht werden. Die Rechnung wird dauerhaft aus der Datenbank gelöscht.",
    cancel: "Abbrechen",
  },
  en: {
    stamp: "Stamp",
    pdf: "PDF",
    view: "View",
    delete: "Delete",
    areYouSure: "Are you sure?",
    deleteWarning:
      "This action cannot be undone. The invoice will be permanently deleted from the database.",
    cancel: "Cancel",
  },
};

const ActionButton = ({ icon: Icon, tooltip, onClick }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClick}
          className="h-8 w-8 p-0"
        >
          <Icon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const ActionButtons = ({
  invoice,
  onViewDetails,
  onDelete,
  onStamp,
}) => {
  const { language } = useLanguage();
  const t = {
    en: {
      view: "View",
      delete: "Delete",
      stamp: "Stamp",
      download: "Download",
    },
    de: {
      view: "Ansehen",
      delete: "Löschen",
      stamp: "Stempeln",
      download: "Herunterladen",
    },
  }[language];

  return (
    <div className="flex space-x-2">
      <ActionButton
        icon={Eye}
        tooltip={t.view}
        onClick={() => onViewDetails(invoice)}
      />
      <ActionButton
        icon={Trash2}
        tooltip={t.delete}
        onClick={() => onDelete(invoice.id)}
      />
      <ActionButton
        icon={Stamp}
        tooltip={t.stamp}
        onClick={() => onStamp(invoice)}
      />
      <ActionButton
        icon={Download}
        tooltip={t.download}
        onClick={() => handleDownloadWithStamp(invoice)}
      />
    </div>
  );
};

export default ActionButtons;
