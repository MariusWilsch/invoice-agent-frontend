import React, { useState, useEffect } from "react";
import {
  useInvoicesDev,
  useDeleteInvoicesDev,
  supabase,
} from "@/integrations/supabase/index.js";
import InvoicePageTemplate from "../components/templates/InvoicePageTemplate";
import StampSheet from "@/components/StampSheet";
import InvoiceDetailsSheet from "@/components/InvoiceDetailsSheet";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";
import axios from "axios";

const Index = () => {
  const { data: initialInvoices, error, isLoading } = useInvoicesDev();
  const deleteInvoiceMutation = useDeleteInvoicesDev();
  const [invoices, setInvoices] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [isStampSheetOpen, setIsStampSheetOpen] = useState(false);
  const [isDetailsSheetOpen, setIsDetailsSheetOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    if (initialInvoices) {
      setInvoices(initialInvoices);
      updateStatuses(initialInvoices);
    }
  }, [initialInvoices]);

  useEffect(() => {
    const channel = supabase
      .channel('invoices_changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'invoices_dev' }, payload => {
        setInvoices(currentInvoices => [...currentInvoices, payload.new]);
        updateStatuses([...invoices, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [invoices]);

  const updateStatuses = (invoicesList) => {
    const uniqueStatuses = Array.from(
      new Set(invoicesList.map((invoice) => {
        if (invoice.status === "Empfangen") return "Unchecked";
        if (invoice.status === "Kontiert") return "Checked";
        return invoice.status;
      }))
    );
    setStatuses(uniqueStatuses);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading invoices: {error.message}</div>;

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

  const handleManualRun = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/run", { manual_run: true });
      toast.success("Manual run initiated successfully", {
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        className: "text-green-500",
      });
    } catch (error) {
      console.error("Error initiating manual run:", error);
      toast.error("Failed to initiate manual run", {
        icon: <XCircle className="h-5 w-5 text-red-500" />,
        className: "text-red-500",
      });
    }
  };

  const updatedInvoices = invoices.map(invoice => ({
    ...invoice,
    status: invoice.status === "Empfangen" ? "Unchecked" : 
            invoice.status === "Kontiert" ? "Checked" : 
            invoice.status
  }));

  const filteredInvoices = updatedInvoices.filter(invoice => invoice.status !== "Marius_TEST");

  return (
    <div>
      <InvoicePageTemplate
        invoices={filteredInvoices}
        allInvoices={updatedInvoices}
        statuses={statuses}
        onViewDetails={handleViewDetails}
        onDelete={handleDelete}
        onStamp={handleStampClick}
        onManualRun={handleManualRun}
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
