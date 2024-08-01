import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvoiceCard from "../organisms/InvoiceCard";
import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import FilterButton from "../molecules/FilterButton";

const translations = {
  de: {
    all: "Alle",
    invoices: "Rechnungen",
    manage: "Verwalten Sie Ihre Rechnungen und sehen Sie deren Details ein.",
    unchecked: "Unkontiert",
    showing: "Zeige",
    invoicesCount: "Rechnungen",
    manualRun: "Manueller Lauf",
  },
  en: {
    all: "All",
    invoices: "Invoices",
    manage: "Manage your invoices and view their details.",
    unchecked: "Unchecked",
    showing: "Showing",
    invoicesCount: "invoices",
    manualRun: "Manual Run",
    filter: "Filter",
  },
};

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
}) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div>
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">{t.all}</TabsTrigger>
            {statuses.map((status) => (
              <TabsTrigger key={status} value={status.toLowerCase()}>
                {status === "Empfangen" ? t.unchecked : status}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex space-x-2">
            <FilterButton 
              onFilter={onFilter} 
              onClearFilter={onClearFilter}
              isFilterActive={isFilterActive}
            />
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
              title={`${status === "Empfangen" ? t.unchecked : status} ${
                t.invoices
              }`}
              description={t.manage}
              invoices={
                status === "Marius_TEST"
                  ? allInvoices.filter((invoice) => invoice.status === status)
                  : invoices.filter((invoice) => invoice.status === status)
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
