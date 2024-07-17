import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const InvoiceDetailsSheet = ({ isOpen, onOpenChange, invoice }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[60vw] sm:w-[60vw] min-w-[50vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold mb-6">Datenübersicht</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          {invoice ? (
            <div className="space-y-4">
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
                <Field label="Brutto" value={renderAmount(invoice.amount)} />
                <Field label="Gebucht" value={invoice.gebucht || "Leer"} />
                <Field label="Sender" value={invoice.sender ? (Array.isArray(invoice.sender) ? invoice.sender.join(", ") : invoice.sender) : "Finance, finance@wph.onl"} />
                <Field label="Skonto" value={invoice.skonto || "No"} />
              </div>
              <Field label="Email Body" value={invoice.email_body || "Leer"} fullWidth />
            </div>
          ) : (
            <p>No invoice selected</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Field = ({ label, value, fullWidth = false }) => (
  <div className={`mb-4 ${fullWidth ? 'col-span-2' : ''}`}>
    <p className="text-sm font-medium text-gray-500 mb-1">{label}:</p>
    <div className={`bg-gray-100 p-2 rounded-md ${fullWidth ? 'min-h-[100px] overflow-y-auto' : ''}`}>
      <p className="text-sm text-gray-800 whitespace-pre-wrap">{value}</p>
    </div>
  </div>
);

const renderAmount = (amount) => {
  if (typeof amount === 'object' && amount !== null && 'gross_amount' in amount && 'net_amount' in amount && 'currency' in amount) {
    return `NETTO: ${amount.net_amount} ${amount.currency} and BRUTTO: ${amount.gross_amount} ${amount.currency}`;
  }
  return 'N/A';
};

export default InvoiceDetailsSheet;