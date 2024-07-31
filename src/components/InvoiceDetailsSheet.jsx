import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useLanguage } from "../contexts/LanguageContext";

const InvoiceDetailsSheet = ({ isOpen, onOpenChange, invoice }) => {
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Data Overview",
      receivedOn: "Received on",
      costCenter: "Cost Center",
      account: "Account",
      vb: "VB",
      evVp: "EV/VP",
      checkedBy: "Checked by",
      documentText: "Document Text",
      paidBy: "Paid by",
      comment: "Comment",
      dueDate: "Due Date",
      gross: "Gross",
      booked: "Booked",
      sender: "Sender",
      discount: "Discount",
      emailBody: "Email Body",
      noInvoice: "No invoice selected",
      empty: "Empty",
      no: "No",
      invoiceNumber: "Invoice Number",
      invoiceDate: "Invoice Date",
      vat_rate: "VAT Rate",
      vat_id: "VAT ID",
    },
    de: {
      title: "Datenübersicht",
      receivedOn: "Eingegangen am",
      costCenter: "Kostenstelle",
      account: "Konto",
      vb: "VB",
      evVp: "EV/VP",
      checkedBy: "Geprüft von",
      documentText: "Belegtext",
      paidBy: "Bezahlt von",
      comment: "Kommentar",
      dueDate: "Fällig am",
      gross: "Brutto",
      booked: "Gebucht",
      sender: "Absender",
      discount: "Skonto",
      emailBody: "E-Mail-Text",
      noInvoice: "Keine Rechnung ausgewählt",
      empty: "Leer",
      no: "Nein",
      invoiceNumber: "Rechnungsnummer",
      invoiceDate: "Rechnungsdatum",
      vat_rate: "Umsatzsteuersatz",
      vat_id: "Umsatzsteuer-ID",
    },
  };

  const t = translations[language];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[60vw] sm:w-[60vw] min-w-[50vw] overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold mb-6">{t.title}</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          {invoice ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label={t.receivedOn}
                  value={invoice.eingegangen_am || "2024-06-11T05:42:51+00:00"}
                />
                <Field
                  label={t.costCenter}
                  value={invoice.kostenstelle || t.empty}
                />
                <Field label={t.account} value={invoice.konto || t.empty} />
                <Field label={t.vb} value={invoice.VB || t.empty} />
                <Field label={t.evVp} value={invoice.ev_vp || t.empty} />
                <Field
                  label={t.checkedBy}
                  value={invoice.wer_geprüft || t.empty}
                />
                <Field
                  label={t.documentText}
                  value={invoice.belegtext || t.empty}
                />
                <Field
                  label={t.paidBy}
                  value={invoice.wer_bezahlt || t.empty}
                />
                <Field label={t.comment} value={invoice.kommentar || t.empty} />
                <Field label={t.dueDate} value={invoice.fällig_am || t.empty} />
                <Field
                  label={t.gross}
                  value={renderAmount(invoice.amount, language)}
                />
                <Field label={t.booked} value={invoice.gebucht || t.empty} />
                <Field
                  label={t.sender}
                  value={
                    invoice.sender
                      ? Array.isArray(invoice.sender)
                        ? invoice.sender.join(", ")
                        : invoice.sender
                      : "Finance, finance@wph.onl"
                  }
                />
                <Field label={t.discount} value={invoice.skonto || t.no} />
                <Field
                  label={t.invoiceNumber}
                  value={invoice.invoice_number || t.empty}
                />
                <Field
                  label={t.invoiceDate}
                  value={invoice.invoice_date || t.empty}
                />
                <Field label={t.vat_rate} value={invoice.vat_rate || t.empty} />
                <Field label={t.vat_id} value={invoice.vat_id || t.empty} />
              </div>
              <Field
                label={t.emailBody}
                value={invoice.email_body || t.empty}
                fullWidth
              />
            </div>
          ) : (
            <p>{t.noInvoice}</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Field = ({ label, value, fullWidth = false }) => (
  <div className={`mb-4 ${fullWidth ? "col-span-2" : ""}`}>
    <p className="text-sm font-medium text-gray-500 mb-1">{label}:</p>
    <div
      className={`bg-gray-100 p-2 rounded-md ${
        fullWidth ? "min-h-[100px] overflow-y-auto" : ""
      }`}
    >
      <p className="text-sm text-gray-800 whitespace-pre-wrap">{value}</p>
    </div>
  </div>
);

const renderAmount = (amount, language) => {
  if (
    typeof amount === "object" &&
    amount !== null &&
    "gross_amount" in amount &&
    "net_amount" in amount &&
    "currency" in amount
  ) {
    return language === "de"
      ? `NETTO: ${amount.net_amount} ${amount.currency} und BRUTTO: ${amount.gross_amount} ${amount.currency}`
      : `NET: ${amount.net_amount} ${amount.currency} and GROSS: ${amount.gross_amount} ${amount.currency}`;
  }
  return "N/A";
};

export default InvoiceDetailsSheet;
