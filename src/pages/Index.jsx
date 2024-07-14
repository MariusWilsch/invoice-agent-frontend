import React, { useState, useEffect } from "react";
import { useInvoicesDev, useDeleteInvoicesDev } from "@/integrations/supabase/index.js";
import InvoicePageTemplate from "../components/templates/InvoicePageTemplate";
import StampSheet from "@/components/StampSheet";
import InvoiceDetailsSheet from "@/components/InvoiceDetailsSheet";
import { toast } from "sonner";

const Index = () => {
  const { data: invoices, error, isLoading } = useInvoicesDev();
  const deleteInvoiceMutation = useDeleteInvoicesDev();
  const [statuses, setStatuses] = useState([]);
  const [isStampSheetOpen, setIsStampSheetOpen] = useState(false);
  const [isDetailsSheetOpen, setIsDetailsSheetOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    if (invoices) {
      const uniqueStatuses = Array.from(
        new Set(invoices.map((invoice) => invoice.status))
      );
      setStatuses(uniqueStatuses);
    }
  }, [invoices]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading invoices: {error.message}</div>;

  const handleStampClick = () => {
    setIsStampSheetOpen(true);
  };

  const handleViewDetails = (invoice) => {
    setSelectedInvoice(invoice);
    setIsDetailsSheetOpen(true);
  };

  const handleDelete = async (invoiceId) => {
    try {
      await deleteInvoiceMutation.mutateAsync(invoiceId);
      toast.success("Invoice deleted successfully");
    } catch (error) {
      console.error("Error deleting invoice:", error);
      toast.error("Failed to delete invoice");
    }
  };

  const handleAddInvoice = () => {
    // Implement add invoice functionality here
    console.log("Add new invoice");
  };

  return (
    <>
      <InvoicePageTemplate
        invoices={invoices}
        statuses={statuses}
        onViewDetails={handleViewDetails}
        onDelete={handleDelete}
        onStamp={handleStampClick}
        onAddInvoice={handleAddInvoice}
      />

      <StampSheet
        isOpen={isStampSheetOpen}
        onOpenChange={setIsStampSheetOpen}
      />

      <InvoiceDetailsSheet
        isOpen={isDetailsSheetOpen}
        onOpenChange={setIsDetailsSheetOpen}
        invoice={selectedInvoice}
      />
    </>
  );
};

export default Index;