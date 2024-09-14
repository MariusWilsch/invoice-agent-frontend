import React from "react";
import { FileText, Eye, Trash, Stamp, FileDown } from "lucide-react";
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
import { useTranslations } from "@/hooks/useTranslations";
import axios from "axios";
import { toast } from "sonner";

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
  const t = useTranslations();

  const handleAddAccountingStamp = async () => {
    try {
      const stampData = {
        eingegangen: invoice.eingegangen_am || "",
        faellig: invoice.faellig_am || "",
        konto: invoice.konto || "",
        evVp: invoice.ev_vp || "",
        belegtext: invoice.belegtext || "",
        ticketnummer: invoice.ticket_number || "",
        kostenstelle: invoice.kostenstelle || "",
        vb: invoice.VB || "",
        skonto: invoice.skonto ? invoice.skonto.toString() : "",
        kommentar: invoice.kommentar || "",
        public_url: invoice.public_url || "",
      };

      const response = await axios.post(
        "https://eokgvoyqcnhkpfqhicuz.supabase.co/functions/v1/addAccoutingStamp",
        stampData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `accounting_stamp_${invoice.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success(t.accountingStampAdded);
    } catch (error) {
      console.error("Error adding accounting stamp:", error);
      toast.error(t.errorAddingAccountingStamp);
    }
  };

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
      <ActionButton
        icon={FileDown}
        tooltip={t.addAccountingStamp}
        onClick={handleAddAccountingStamp}
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
            <AlertDialogDescription>{t.deleteWarning}</AlertDialogDescription>
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
