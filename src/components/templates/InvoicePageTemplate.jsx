import React from "react";
import { useTranslations } from "../../hooks/useTranslations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvoiceCard from "../organisms/InvoiceCard";
import DateRangePicker from "../molecules/DateRangePicker";
import { toast } from "sonner";
import axios from "axios";
import { useSupabaseAuth } from "@/integrations/supabase/auth.jsx";

const InvoicePageTemplate = ({
  invoices,
  onViewDetails,
  onDelete,
  onStamp,
  onDateRangeSelect,
}) => {
  const t = useTranslations();
  const { session } = useSupabaseAuth();

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
      case "paid":
      case "bezahlt":
        return t.bezahlt;
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

  const handleDateRangeConfirm = async (dateRange) => {
    const fromDate = dateRange.from;
    const toDate = dateRange.to;

    const formattedFromDate = fromDate.toLocaleDateString();
    const formattedToDate = toDate.toLocaleDateString();

    toast.info(
      `Processing invoices from ${formattedFromDate} to ${formattedToDate}`
    );

    try {
      await axios.post("http://127.0.0.1:8081/run", {
        user_id: session?.user?.id,
        from_date: fromDate.toISOString().split("T")[0],
        to_date: toDate.toISOString().split("T")[0],
      });

      // We don't await the response, so we can just call onDateRangeSelect here
      onDateRangeSelect(fromDate, toDate);
    } catch (error) {
      console.error("Error sending date range to backend:", error);
      toast.error("Failed to process invoices for the selected date range");
    }
  };

  return (
    <div>
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">{t.all}</TabsTrigger>
            <TabsTrigger value="unkontiert">{t.unkontiert}</TabsTrigger>
            <TabsTrigger value="kontiert">{t.kontiert}</TabsTrigger>
            <TabsTrigger value="bezahlt">{t.bezahlt}</TabsTrigger>
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
        <TabsContent value="bezahlt">
          <InvoiceCard
            title={`${t.bezahlt} ${t.invoices}`}
            description={t.manage}
            invoices={filterInvoices("bezahlt")}
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
