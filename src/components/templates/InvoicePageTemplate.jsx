import React from "react";
import { useTranslations } from "../../hooks/useTranslations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvoiceCard from "../organisms/InvoiceCard";
import FilterButton from "../molecules/FilterButton";
import ExportButton from "../molecules/ExportButton";

const InvoicePageTemplate = ({
  invoices,
  onViewDetails,
  onDelete,
  onStamp,
  onFilter,
  onClearFilter,
  isFilterActive,
  dateFilter,
}) => {
  const t = useTranslations();

  const [activeTab, setActiveTab] = React.useState("all");

  const getTranslatedStatus = (status) => {
    console.log("Status in getTranslatedStatus", status);
    switch (status.toLowerCase()) {
      case "unchecked":
      case "unkontiert":
        return "test";
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
    return invoices.filter(
      (invoice) =>
        invoice.status.toLowerCase() === status.toLowerCase() ||
        (status === "unkontiert" &&
          invoice.status.toLowerCase() === "empfangen") ||
        (status === "kontiert" && invoice.status.toLowerCase() === "checked")
    );
  };

  return (
    <div>
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">{t.all}</TabsTrigger>
            <TabsTrigger value="unkontiert">{t.unkontiert}</TabsTrigger>
            <TabsTrigger value="kontiert">{t.kontiert}</TabsTrigger>
          </TabsList>
          <div className="flex space-x-2">
            <FilterButton
              onFilter={onFilter}
              onClearFilter={onClearFilter}
              isFilterActive={isFilterActive}
              status={getTranslatedStatus(activeTab)}
            />
            <ExportButton dateFilter={dateFilter} />
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
            title={`${t.unkontiert} ${t.invoices}`}
            description={t.manage}
            invoices={filterInvoices("unkontiert")}
            onViewDetails={onViewDetails}
            onDelete={onDelete}
            onStamp={onStamp}
          />
        </TabsContent>
        <TabsContent value="kontiert">
          <InvoiceCard
            title={`${t.kontiert} ${t.invoices}`}
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
