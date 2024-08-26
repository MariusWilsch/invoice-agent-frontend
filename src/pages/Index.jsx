import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  useInvoicesDev,
  useDeleteInvoicesDev,
  supabase,
} from "@/integrations/supabase/index.js";
import InvoicePageTemplate from "../components/templates/InvoicePageTemplate";
import { format } from "date-fns";
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
  const [dateFilter, setDateFilter] = useState({ from: null, to: null });

  const updateStatuses = useCallback((invoicesList) => {
    const uniqueStatuses = Array.from(
      new Set(
        invoicesList.map((invoice) => {
          if (invoice.status === "Empfangen") return "Unchecked";
          if (invoice.status === "Kontiert") return "Checked";
          return invoice.status;
        })
      )
    );
    setStatuses(uniqueStatuses);
  }, []);

  useEffect(() => {
    if (initialInvoices) {
      const sortedInvoices = [...initialInvoices].sort(
        (a, b) => new Date(a.invoice_date) - new Date(b.invoice_date)
      );
      setInvoices(sortedInvoices);
      updateStatuses(sortedInvoices);
    }
  }, [initialInvoices, updateStatuses]);

  useEffect(() => {
    const channel = supabase
      .channel("invoices_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "invoices_dev" },
        (payload) => {
          setInvoices((currentInvoices) => {
            const newInvoices = [...currentInvoices, payload.new];
            updateStatuses(newInvoices);
            return newInvoices;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [updateStatuses]);

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

  const handleManualRun = useCallback(async () => {
    try {
      await axios.post("https://invoiceagenttry2.ey.r.appspot.com/run", {
        manual_run: "today",
      });
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
  }, []);

  const handleFilter = useCallback((dateRange) => {
    setDateFilter(dateRange);
  }, []);

  const handleClearFilter = useCallback(() => {
    setDateFilter({ from: null, to: null });
  }, []);

  const filteredInvoices = useMemo(() => {
    return invoices
      .map((invoice) => ({
        ...invoice,
        status:
          invoice.status === "Empfangen"
            ? "Unchecked"
            : invoice.status === "Kontiert"
            ? "Checked"
            : invoice.status,
      }))
      .filter((invoice) => invoice.status !== "Marius_TEST");
  }, [invoices]);

  useEffect(() => {
    const fetchFilteredInvoices = async () => {
      if (dateFilter.from && dateFilter.to) {
        const { data, error } = await supabase
          .from("invoices_dev")
          .select()
          .gte("invoice_date", format(dateFilter.from, "yyyy-MM-dd"))
          .lte("invoice_date", format(dateFilter.to, "yyyy-MM-dd"));

        if (error) {
          console.error("Error fetching filtered invoices:", error);
        } else {
          setInvoices(data);
        }
      }
    };

    fetchFilteredInvoices();
  }, [dateFilter]);

  const isFilterActive = useMemo(
    () => dateFilter.from !== null && dateFilter.to !== null,
    [dateFilter]
  );

  if (isLoading) return <div>Loading...</div>;
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
        onManualRun={handleManualRun}
        onFilter={handleFilter}
        onClearFilter={handleClearFilter}
        isFilterActive={isFilterActive}
        dateFilter={dateFilter}
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
