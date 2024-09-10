import React from "react";
import { useTranslations } from "../../hooks/useTranslations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvoiceCard from "../organisms/InvoiceCard";
import { Button } from "@/components/ui/button";
import FilterButton from "../molecules/FilterButton";
import ExportButton from "../molecules/ExportButton";

const InvoicePageTemplate = ({
  invoices,
  allInvoices,
  statuses,
  onViewDetails,
  onDelete,
  onStamp,
  onManualRun,
  onFilter,
  onClearFilter,
  isFilterActive,
  dateFilter,
}) => {
  const t = useTranslations();

  const getTranslatedStatus = (status) => {
    switch (status.toLowerCase()) {
      case "unchecked":
      case "unkontiert":
        return t.unchecked;
      case "checked":
      case "kontiert":
        return t.checked;
      case "received":
      case "empfangen":
        return t.received;
      default:
        return status;
    }
  };

  const filterInvoices = (status) => {
    if (status === "all") return invoices;
    return invoices.filter(invoice => 
      invoice.status.toLowerCase() === status.toLowerCase() ||
      (status === "unkontiert" && invoice.status.toLowerCase() === "empfangen") ||
      (status === "kontiert" && invoice.status.toLowerCase() === "checked")
    );
  };

  return (
    <div>
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">{t.all}</TabsTrigger>
            <TabsTrigger value="unkontiert">{t.unchecked}</TabsTrigger>
            <TabsTrigger value="kontiert">{t.checked}</TabsTrigger>
          </TabsList>
          <div className="flex space-x-2">
            <FilterButton
              onFilter={onFilter}
              onClearFilter={onClearFilter}
              isFilterActive={isFilterActive}
            />
            <ExportButton dateFilter={dateFilter} />
            <Button onClick={onManualRun}>{t.manualRun}</Button>
          </div>
        </div>
        <TabsContent value="all">
          <InvoiceCard
            title={t.invoices}
            description={t.manage}
            invoices={filterInvoices("all")}
            onViewDetails={onViewDetails}
            onDelete={onDelete}
            onStamp={onStamp}
            showingText={`${t.showing} ${invoices.length} ${t.invoicesCount}`}
          />
        </TabsContent>
        <TabsContent value="unkontiert">
          <InvoiceCard
            title={`${t.unchecked} ${t.invoices}`}
            description={t.manage}
            invoices={filterInvoices("unkontiert")}
            onViewDetails={onViewDetails}
            onDelete={onDelete}
            onStamp={onStamp}
          />
        </TabsContent>
        <TabsContent value="kontiert">
          <InvoiceCard
            title={`${t.checked} ${t.invoices}`}
            description={t.manage}
            invoices={filterInvoices("kontiert")}
            onViewDetails={onViewDetails}
            onDelete={onDelete}
            onStamp={onStamp}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvoicePageTemplate;