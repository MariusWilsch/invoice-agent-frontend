import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvoiceCard from '../organisms/InvoiceCard';

const InvoicePageTemplate = ({ invoices, allInvoices, statuses, onViewDetails, onDelete, onStamp }) => (
  <div>
    <Tabs defaultValue="all">
      <div className="flex items-center mb-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          {statuses.map((status) => (
            <TabsTrigger key={status} value={status.toLowerCase()}>
              {status === "Empfangen" ? "Unkontiert" : status}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <TabsContent value="all">
        <InvoiceCard
          title="Invoices"
          description="Manage your invoices and view their details."
          invoices={invoices}
          onViewDetails={onViewDetails}
          onDelete={onDelete}
          onStamp={onStamp}
        />
      </TabsContent>
      {statuses.map((status) => (
        <TabsContent key={status} value={status.toLowerCase()}>
          <InvoiceCard
            title={`${status === "Empfangen" ? "Unkontiert" : status} Invoices`}
            description={`Manage your ${status.toLowerCase() === "empfangen" ? "unkontiert" : status.toLowerCase()} invoices and view their details.`}
            invoices={status === "Marius_TEST" ? allInvoices.filter((invoice) => invoice.status === status) : invoices.filter((invoice) => invoice.status === status)}
            onViewDetails={onViewDetails}
            onDelete={onDelete}
            onStamp={onStamp}
          />
        </TabsContent>
      ))}
    </Tabs>
  </div>
);

export default InvoicePageTemplate;
