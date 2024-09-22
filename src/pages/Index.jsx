import React, { useState, useCallback } from "react";
import {
  useInvoicesDev,
  useDeleteInvoiceDev,
} from "@/integrations/supabase/index.js";
import InvoicePageTemplate from "../components/templates/InvoicePageTemplate";
import StampSheet from "@/components/StampSheet";
import InvoiceDetailsSheet from "@/components/InvoiceDetailsSheet";
import { toast } from "sonner";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const Index = () => {
  const { data: invoices, error, isLoading, refetch } = useInvoicesDev();
  const deleteInvoiceMutation = useDeleteInvoiceDev();
  const [isStampSheetOpen, setIsStampSheetOpen] = useState(false);
  const [isDetailsSheetOpen, setIsDetailsSheetOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleStampClick = useCallback((invoice) => {
    setSelectedInvoice(invoice);
    setIsStampSheetOpen(true);
  }, []);

  const handleViewDetails = useCallback((invoice) => {
    setSelectedInvoice(invoice);
    setIsDetailsSheetOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (invoiceId) => {
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
    },
    [deleteInvoiceMutation]
  );

  const handleDateRangeSelect = useCallback((fromDate, toDate) => {
    // Here you would typically update your API call with the new date range
    // For now, we'll just log it and refetch the data
    console.log(`Fetching invoices from ${fromDate.toISOString()} to ${toDate.toISOString()}`);
    refetch();
  }, [refetch]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  if (error) return <div>Error loading invoices: {error.message}</div>;

  return (
    <div>
      <InvoicePageTemplate
        invoices={invoices}
        onViewDetails={handleViewDetails}
        onDelete={handleDelete}
        onStamp={handleStampClick}
        onDateRangeSelect={handleDateRangeSelect}
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
