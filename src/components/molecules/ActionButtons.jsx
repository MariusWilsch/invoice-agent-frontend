import React from "react";
import { FileText, Eye, Trash, Stamp } from "lucide-react";
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

const translations = {
  de: {
    stamp: "Stempel",
    pdf: "PDF",
    view: "Ansehen",
    delete: "Löschen",
    areYouSure: "Sind Sie sicher?",
    deleteWarning: "Diese Aktion kann nicht rückgängig gemacht werden. Die Rechnung wird dauerhaft aus der Datenbank gelöscht.",
    cancel: "Abbrechen",
  },
  en: {
    stamp: "Stamp",
    pdf: "PDF",
    view: "View",
    delete: "Delete",
    areYouSure: "Are you sure?",
    deleteWarning: "This action cannot be undone. The invoice will be permanently deleted from the database.",
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

const ActionButtons = ({ invoice, onViewDetails, onDelete, onStamp }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="flex space-x-1">
      <ActionButton
        icon={Stamp}
        tooltip={t.stamp}
        onClick={() => onStamp(invoice)}
      />
      <ActionButton
        icon={FileText}
        tooltip={t.pdf}
        onClick={() => window.open(invoice.public_url, "_blank")}
      />
      <ActionButton
        icon={Eye}
        tooltip={t.view}
        onClick={() => onViewDetails(invoice)}
      />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <Trash className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.areYouSure}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.deleteWarning}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete(invoice.id)}>
              {t.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ActionButtons;
