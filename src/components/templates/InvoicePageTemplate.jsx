import React from "react";
import { useTranslations } from "../../hooks/useTranslations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvoiceCard from "../organisms/InvoiceCard";
import DateRangePicker from "../molecules/DateRangePicker";

const InvoicePageTemplate = ({
  invoices,
  onViewDetails,
  onDelete,
  onStamp,
}) => {
  const t = useTranslations();

  const [activeTab, setActiveTab] = React.useState("all");

  const getTranslatedStatus = (status) => {
    switch (status.toLowerCase()) {
      case "unchecked":
      case "unkontiert":
        return t.unkontiert;
      case "checked":
      case "kontiert":
        return t.kontiert;
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

  const handleDateRangeConfirm = (dateRange) => {
    console.log("Selected date range:", dateRange);
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
            <DateRangePicker onConfirm={handleDateRangeConfirm} />
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
