import React, { useState, useEffect, useMemo } from "react";
import { useInvoicesDev, useDeleteInvoiceDev } from "@/integrations/supabase/index.js";
import InvoicePageTemplate from "../components/templates/InvoicePageTemplate";
import { format } from "date-fns";
import StampSheet from "@/components/StampSheet";
import InvoiceDetailsSheet from "@/components/InvoiceDetailsSheet";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { data: initialInvoices, error, isLoading } = useInvoicesDev();
  const deleteInvoiceMutation = useDeleteInvoiceDev();
  const [invoices, setInvoices] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [isStampSheetOpen, setIsStampSheetOpen] = useState(false);
  const [isDetailsSheetOpen, setIsDetailsSheetOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [dateFilter, setDateFilter] = useState({ from: null, to: null });

  useEffect(() => {
    if (initialInvoices) {
      const sortedInvoices = [...initialInvoices].sort(
        (a, b) => new Date(b.invoice_date) - new Date(a.invoice_date)
      );
      setInvoices(sortedInvoices);
      updateStatuses(sortedInvoices);
    }
  }, [initialInvoices]);

  const updateStatuses = (invoicesList) => {
    const uniqueStatuses = Array.from(
      new Set(
        invoicesList.map((invoice) => {
          if (invoice.status.toLowerCase() === "empfangen") return "Unchecked";
          if (invoice.status.toLowerCase() === "kontiert") return "Checked";
          return invoice.status;
        })
      )
    );
    setStatuses(uniqueStatuses);
  };

  const handleStampClick = (invoice) => {
    setSelectedInvoice(invoice);
    setIsStampSheetOpen(true);
  };

  const handleViewDetails = (invoice) => {
    setSelectedInvoice(invoice);
    setIsDetailsSheetOpen(true);
  };

  const handleDelete = async (invoiceId) => {
    try {
      await deleteInvoiceMutation.mutateAsync(invoiceId);
      toast.success("Invoice deleted successfully", {
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        className: "text-green-500",
      });
    } catch (error) {
      console.error("Error deleting invoice:", error);
      toast.error("Failed to delete invoice", {
        icon: <XCircle className="h-5 w-5 text-red-500" />,
        className: "text-red-500",
      });
    }
  };

  const filteredInvoices = useMemo(() => {
    return invoices
      .map((invoice) => ({
        ...invoice,
        status:
          invoice.status.toLowerCase() === "empfangen"
            ? "Unchecked"
            : invoice.status.toLowerCase() === "kontiert"
            ? "Checked"
            : invoice.status,
      }))
      .filter((invoice) => invoice.status !== "Marius_TEST");
  }, [invoices]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (error) return <div>Error loading invoices: {error.message}</div>;

  return (
    <div>
      <InvoicePageTemplate
        invoices={filteredInvoices}
        allInvoices={invoices}
        statuses={statuses}
        onViewDetails={handleViewDetails}
        onDelete={handleDelete}
        onStamp={handleStampClick}
        dateFilter={dateFilter}
      />

      <StampSheet
        isOpen={isStampSheetOpen}
        onOpenChange={setIsStampSheetOpen}
        invoice={selectedInvoice}
      />

      <InvoiceDetailsSheet
        isOpen={isDetailsSheetOpen}
        onOpenChange={setIsDetailsSheetOpen}
        invoice={selectedInvoice}
      />
    </div>
  );
};

export default Index;
