import React, { useState } from "react";
import { FileText, Eye, Trash, Stamp, FileDown, Loader2 } from "lucide-react";
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
import { supabase } from "@/integrations/supabase";

const ActionButton = ({ icon: Icon, tooltip, onClick, disabled }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClick}
          className="h-8 w-8 p-0"
          disabled={disabled}
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
  const [isLoading, setIsLoading] = useState(false);

  const handleAddAccountingStamp = async () => {
    setIsLoading(true);
    toast.loading(t.addingAccountingStamp);
    try {
      const stampData = {
        eingegangen: invoice.eingegangen_am || "",
        faellig: invoice.faellig_am || "",
        konto: invoice.konto || "",
        evVp: invoice.ev_vp || "",
        belegtext: invoice.belegtext || "",
        ticketnummer: invoice.ticket_number || "",
        kostenstelle: invoice.kostenstelle || "",
        vb: invoice.vb || "",
        skonto: invoice.skonto ? invoice.skonto.toString() : "Nein",
        kommentar: invoice.kommentar || "",
        public_url: invoice.public_url || "",
      };

      const { data, error } = await supabase.functions.invoke(
        "addAccoutingStamp",
        {
          body: stampData,
        }
      );

      if (error) throw error;

      const blob =
        data instanceof Blob
          ? data
          : new Blob([data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `accounting_stamp_${invoice.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.dismiss();
      toast.success(t.accountingStampAdded);
    } catch (error) {
      console.error("Error adding accounting stamp:", error);
      toast.dismiss();
      toast.error(t.errorAddingAccountingStamp);
    } finally {
      setIsLoading(false);
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
        icon={isLoading ? Loader2 : FileDown}
        tooltip={t.addAccountingStamp}
        onClick={handleAddAccountingStamp}
        disabled={isLoading}
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
