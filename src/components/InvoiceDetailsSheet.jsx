import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const InvoiceDetailsSheet = ({ isOpen, onOpenChange, invoice }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[60vw] sm:w-[60vw] min-w-[50vw]">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold mb-6">Datenübersicht</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          {invoice ? (
            <div className="grid grid-cols-2 gap-4">
              <Field label="Eingegangen_am" value={invoice.eingegangen_am || "2024-06-11T05:42:51+00:00"} />
              <Field label="Kostenstelle" value={invoice.kostenstelle || "Leer"} />
              <Field label="Konto" value={invoice.konto || "Leer"} />
              <Field label="VB" value={invoice.VB || "Leer"} />
              <Field label="Ev/Vp" value={invoice.ev_vp || "Leer"} />
              <Field label="wer_geprüft" value={invoice.wer_geprüft || "Leer"} />
              <Field label="Belegtext" value={invoice.belegtext || "Leer"} />
              <Field label="wer_bezahlt" value={invoice.wer_bezahlt || "Leer"} />
              <Field label="Kommentar" value={invoice.kommentar || "Leer"} />
              <Field label="Fällig_am" value={invoice.fällig_am || "Leer"} />
              <Field label="Amount" value={invoice.amount || "Leer"} />
              <Field label="Gebucht" value={invoice.gebucht || "Leer"} />
              <Field label="Sender" value={invoice.sender ? (Array.isArray(invoice.sender) ? invoice.sender.join(", ") : invoice.sender) : "Finance, finance@wph.onl"} />
              <Field label="Skonto" value={invoice.skonto || "No"} />
            </div>
          ) : (
            <p>No invoice selected</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Field = ({ label, value }) => (
  <div className="mb-4 w-full">
    <p className="text-sm font-medium text-gray-500 mb-1">{label}:</p>
    <div className="bg-gray-100 p-2 rounded-md">
      <p className="text-sm text-gray-800">{value}</p>
    </div>
    <Separator className="mt-2" />
  </div>
);

export default InvoiceDetailsSheet;