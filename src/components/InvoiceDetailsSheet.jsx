import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InvoiceDetailsSheet = ({ isOpen, onOpenChange, invoice }) => {
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Data Overview",
      stampFields: "Stamp Fields",
      invoiceDetails: "Invoice Details",
      financialDetails: "Financial Details",
      costCenter: "Cost Center",
      account: "Account",
      vb: "VB",
      evVp: "EV/VP",
      checkedBy: "Checked by",
      documentText: "Document Text",
      paidBy: "Paid by",
      comment: "Comment",
      booked: "Booked",
      discount: "Discount",
      invoiceNumber: "Invoice Number",
      dateIssued: "Date Issued",
      dueDate: "Due Date",
      sender: "Sender",
      vatId: "VAT ID",
      emailBody: "Email Body",
      grossAmount: "test",
      netAmount: "Net Amount",
      vatAmount: "VAT Amount",
      noInvoice: "No invoice selected",
      empty: "Empty",
      no: "No",
    },
    de: {
      title: "Datenübersicht",
      stampFields: "Stempelfelder",
      invoiceDetails: "Rechnungsdetails",
      financialDetails: "Finanzielle Details",
      costCenter: "Kostenstelle",
      account: "Konto",
      vb: "VB",
      evVp: "EV/VP",
      checkedBy: "Geprüft von",
      documentText: "Belegtext",
      paidBy: "Bezahlt von",
      comment: "Kommentar",
      booked: "Gebucht",
      discount: "Skonto",
      invoiceNumber: "Rechnungsnummer",
      dateIssued: "Ausstellungsdatum",
      dueDate: "Fälligkeitsdatum",
      sender: "Absender",
      vatId: "Umsatzsteuer-ID",
      emailBody: "E-Mail-Text",
      grossAmount: "Bruttobetrag",
      netAmount: "Nettobetrag",
      vatAmount: "Umsatzsteuerbetrag",
      noInvoice: "Keine Rechnung ausgewählt",
      empty: "Leer",
      no: "Nein",
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
        <div className="mt-6 space-y-6">
          {invoice ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>{t.stampFields}</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
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
                  <Field
                    label={t.comment}
                    value={invoice.kommentar || t.empty}
                  />
                  <Field label={t.booked} value={invoice.gebucht || t.empty} />
                  <Field label={t.discount} value={invoice.skonto || t.no} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.invoiceDetails}</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <Field
                    label={t.invoiceNumber}
                    value={invoice.invoice_number || t.empty}
                  />
                  <Field
                    label={t.dateIssued}
                    value={invoice.invoice_date || t.empty}
                  />
                  <Field
                    label={t.dueDate}
                    value={invoice.fällig_am || t.empty}
                  />
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
                  <Field label={t.vatId} value={invoice.vat_id || t.empty} />
                  <Field
                    label={t.emailBody}
                    value={invoice.email_body || t.empty}
                    fullWidth
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.financialDetails}</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <Field
                    label={t.grossAmount}
                    value={renderAmount(
                      invoice.amount,
                      "gross_amount",
                      language
                    )}
                  />
                  <Field
                    label={t.netAmount}
                    value={renderAmount(invoice.amount, "net_amount", language)}
                  />
                  <Field
                    label={t.vatAmount}
                    value={renderAmount(invoice.amount, "vat_amount", language)}
                  />
                </CardContent>
              </Card>
            </>
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

const renderAmount = (amount, field, language) => {
  if (
    typeof amount === "object" &&
    amount !== null &&
    field in amount &&
    "currency" in amount
  ) {
    return new Intl.NumberFormat(language === "de" ? "de-DE" : "en-US", {
      style: "currency",
      currency: amount.currency,
    }).format(amount[field]);
  }
  return "N/A";
};

export default InvoiceDetailsSheet;
