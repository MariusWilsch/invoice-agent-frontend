import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      grossAmount: "Gross Amount",
      netAmount: "Net Amount",
      vatAmount: "VAT Amount",
      paymentTerms: "Payment Terms",
      vatRate: "VAT Rate",
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
      paymentTerms: "Zahlungsbedingungen",
      vatRate: "Umsatzsteuersatz",
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
                    label={t.paymentTerms}
                    value={invoice.payment_terms || t.empty}
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
                    value={renderAmount(invoice, "gross_amount", language)}
                  />
                  <Field
                    label={t.netAmount}
                    value={renderAmount(invoice, "net_amount", language)}
                  />
                  <Field
                    label={t.vatAmount}
                    value={renderAmount(invoice, "vat_amount", language)}
                  />
                  <Field
                    label={t.vatRate}
                    value={
                      invoice.vat_rate
                        ? `${invoice.vat_rate.replace(/%/g, "")}%`
                        : t.empty
                    }
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

const CopyButton = ({ value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-6 w-6 text-gray-500 hover:text-gray-700"
      onClick={handleCopy}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
};

const Field = ({ label, value, fullWidth = false }) => {
  const isValidValue =
    value && value !== "N/A" && value !== "Empty" && value !== "Leer";

  return (
    <div className={`mb-4 ${fullWidth ? "col-span-2" : ""}`}>
      <p className="text-sm font-medium text-gray-500 mb-1">{label}:</p>
      <div
        className={`bg-gray-100 p-2 rounded-md shadow-md transform hover:translate-y-[-2px] transition-all duration-200 ${
          fullWidth ? "min-h-[100px] overflow-y-auto" : ""
        } flex justify-between items-center`}
      >
        <p className="text-sm text-gray-800 whitespace-pre-wrap flex-grow">
          {value}
        </p>
        {isValidValue && <CopyButton value={value} />}
      </div>
    </div>
  );
};

const renderAmount = (invoice, field, language) => {
  const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat(language === "de" ? "de-DE" : "en-US", {
      style: "currency",
      currency: currency || "EUR",
    }).format(value);
  };

  if (!invoice) return "N/A";

  if (field === "vat_amount" && "vat_amount" in invoice) {
    return formatCurrency(invoice.vat_amount, invoice.amount?.currency);
  }

  if (!invoice.amount || typeof invoice.amount !== "object") return "N/A";

  if (field in invoice.amount) {
    return formatCurrency(invoice.amount[field], invoice.amount.currency);
  }

  return "N/A";
};

export default InvoiceDetailsSheet;
