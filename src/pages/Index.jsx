import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { useInvoicesDev } from "@/integrations/supabase/index.js";
import InvoiceTabs from "@/components/InvoiceTabs";
import InvoiceDrawer from "@/components/InvoiceDrawer";
import StampSheet from "@/components/StampSheet";

const Index = () => {
  const { data: invoices, error, isLoading } = useInvoicesDev();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [isStampSheetOpen, setIsStampSheetOpen] = useState(false);

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

  const handleViewDetails = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleExportJSON = () => {
    const visibleInvoices = invoices.filter((invoice) =>
      statuses.includes(invoice.status)
    );
    const blob = new Blob([JSON.stringify(visibleInvoices, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "invoices.json");
  };

  const handleStampClick = () => {
    setIsStampSheetOpen(true);
  };

  return (
    <div className="p-4">
      <InvoiceTabs
        invoices={invoices}
        statuses={statuses}
        onViewDetails={handleViewDetails}
        onStampClick={handleStampClick}
        onExportJSON={handleExportJSON}
      />

      {selectedInvoice && (
        <InvoiceDrawer
          selectedInvoice={selectedInvoice}
          setSelectedInvoice={setSelectedInvoice}
        />
      )}

      <StampSheet
        isOpen={isStampSheetOpen}
        onOpenChange={setIsStampSheetOpen}
      />
    </div>
  );
};

export default Index;