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
      case "empfangen":
        return t.unchecked;
      case "checked":
      case "kontiert":
        return t.checked;
      case "received":
        return t.received;
      default:
        return status;
    }
  };

  return (
    <div>
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">{t.all}</TabsTrigger>
            {statuses.map((status) => (
              <TabsTrigger key={status} value={status.toLowerCase()}>
                {getTranslatedStatus(status)}
              </TabsTrigger>
            ))}
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
            invoices={invoices}
            onViewDetails={onViewDetails}
            onDelete={onDelete}
            onStamp={onStamp}
            showingText={`${t.showing} ${invoices.length} ${t.invoicesCount}`}
          />
        </TabsContent>
        {statuses.map((status) => (
          <TabsContent key={status} value={status.toLowerCase()}>
            <InvoiceCard
              title={`${getTranslatedStatus(status)} ${t.invoices}`}
              description={t.manage}
              invoices={
                status === "Marius_TEST"
                  ? allInvoices.filter((invoice) => invoice.status === status)
                  : invoices.filter((invoice) => invoice.status.toLowerCase() === status.toLowerCase())
              }
              onViewDetails={onViewDetails}
              onDelete={onDelete}
              onStamp={onStamp}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default InvoicePageTemplate;