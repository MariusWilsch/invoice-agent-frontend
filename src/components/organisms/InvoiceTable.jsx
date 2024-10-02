import React, { useMemo } from "react";
import { useTranslations } from "../../hooks/useTranslations";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import ActionButtons from "../molecules/ActionButtons";
import StatusTag from "../molecules/StatusTag";
import { format } from "date-fns";
import { useUpdateInvoiceDev } from "@/integrations/supabase/index.js";
import { toast } from "sonner";

const InvoiceTable = ({ invoices, onViewDetails, onDelete, onStamp }) => {
  const t = useTranslations();
  const updateInvoiceMutation = useUpdateInvoiceDev();

  const renderSender = (sender, company) => {
    if (company) return company;
    if (Array.isArray(sender) && sender.length > 1) {
      return (
        <div className="flex flex-col">
          <span>{sender[0]}</span>
          <span className="text-sm text-gray-500">
            {sender.slice(1).join(", ")}
          </span>
        </div>
      );
    }
    return Array.isArray(sender) ? sender.join(", ") : sender;
  };

  const renderAmount = (invoice, field) => {
    if (!invoice) return "N/A";

    const formatCurrency = (value, currency) => {
      // Convert "Euro" to "EUR" if necessary
      const currencyCode = currency === "Euro" ? "EUR" : currency || "EUR";
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: currencyCode,
      }).format(value);
    };

    if (
      field === "vat_amount" &&
      "vat_amount" in invoice &&
      invoice.vat_amount != 0.0
    ) {
      return formatCurrency(invoice.vat_amount, invoice.amount?.currency);
    }

    if (invoice.amount && typeof invoice.amount === "object") {
      if (field in invoice.amount) {
        return formatCurrency(invoice.amount[field], invoice.amount.currency);
      }
    }

    return "N/A";
  };

  const totals = useMemo(() => {
    return invoices.reduce(
      (acc, invoice) => {
        const grossAmount =
          invoice.amount && invoice.amount.gross_amount
            ? parseFloat(invoice.amount.gross_amount)
            : 0;
        const vatAmount =
          invoice.amount && invoice.vat_amount
            ? parseFloat(invoice.vat_amount)
            : 0;
        return {
          grossAmount: acc.grossAmount + grossAmount,
          vatAmount: acc.vatAmount + vatAmount,
        };
      },
      { grossAmount: 0, vatAmount: 0 }
    );
  }, [invoices]);

  const handleStatusChange = async (invoiceId, newStatus) => {
    try {
      await updateInvoiceMutation.mutateAsync({
        id: invoiceId,
        status: newStatus,
      });
      toast.success(t.statusUpdateSuccess);
    } catch (error) {
      console.error("Error updating invoice status:", error);
      toast.error(t.statusUpdateError);
    }
  };

  return (
    <Table className="border-collapse">
      <TableHeader>
        <TableRow className="border-b border-gray-200">
          <TableHead className="w-1/4 text-left">{t.vendorName}</TableHead>
          <TableHead className="w-1/8 whitespace-nowrap text-left hidden sm:table-cell">
            {t.dateIssued}
          </TableHead>
          <TableHead className="w-1/8 whitespace-nowrap text-left hidden md:table-cell">
            {t.dueDate}
          </TableHead>
          <TableHead className="w-1/8 whitespace-nowrap text-left hidden lg:table-cell">
            {t.invoiceNumber}
          </TableHead>
          <TableHead className="w-1/8 whitespace-nowrap text-left hidden xl:table-cell">
            {t.grossAmount}
          </TableHead>
          <TableHead className="w-1/8 whitespace-nowrap text-left hidden 2xl:table-cell">
            {t.vatAmount}
          </TableHead>
          <TableHead className="w-1/8 text-left">{t.status}</TableHead>
          <TableHead className="w-1/8 text-left">{t.actions}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice, index) => (
          <TableRow
            key={invoice.id}
            className={`${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            } transition-all duration-200 hover:bg-gray-200 border-b border-gray-200`}
          >
            <TableCell className="w-1/4">
              {renderSender(invoice.sender, invoice.company_name)}
            </TableCell>
            <TableCell className="w-1/8 whitespace-nowrap">
              {format(new Date(invoice.eingegangen_am), "dd.MM.yyyy") || "N/A"}
            </TableCell>
            <TableCell className="w-1/8 whitespace-nowrap hidden md:table-cell">
              {invoice.faellig_am || "N/A"}
            </TableCell>
            <TableCell className="w-1/8 whitespace-nowrap hidden lg:table-cell">
              {invoice.invoice_number || "N/A"}
            </TableCell>
            <TableCell className="w-1/8 whitespace-nowrap hidden xl:table-cell">
              {renderAmount(invoice, "gross_amount")}
            </TableCell>
            <TableCell className="w-1/8 whitespace-nowrap hidden 2xl:table-cell">
              {renderAmount(invoice, "vat_amount")}
            </TableCell>
            <TableCell className="w-1/8">
              <StatusTag
                status={invoice.status}
                onStatusChange={(newStatus) =>
                  handleStatusChange(invoice.id, newStatus)
                }
              />
            </TableCell>
            <TableCell className="w-1/8">
              <ActionButtons
                invoice={invoice}
                onViewDetails={onViewDetails}
                onDelete={onDelete}
                onStamp={onStamp}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="bg-muted/50 font-medium">
          <TableCell colSpan={4} className="font-medium hidden lg:table-cell">
            {t.total}
          </TableCell>
          <TableCell colSpan={4} className="font-medium lg:hidden">
            {t.total}
          </TableCell>
          <TableCell className="whitespace-nowrap font-medium hidden xl:table-cell">
            {new Intl.NumberFormat(t.language === "de" ? "de-DE" : "en-US", {
              style: "currency",
              currency: invoices[0]?.amount?.currency || "EUR",
            }).format(totals.grossAmount)}
          </TableCell>
          <TableCell className="whitespace-nowrap font-medium hidden 2xl:table-cell">
            {new Intl.NumberFormat(t.language === "de" ? "de-DE" : "en-US", {
              style: "currency",
              currency: invoices[0]?.amount?.currency || "EUR",
            }).format(totals.vatAmount)}
          </TableCell>
          <TableCell colSpan={2} />
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default InvoiceTable;
