import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InvoiceTable from './InvoiceTable';

const InvoiceCard = ({ title, description, invoices, onViewDetails, onDelete, onStamp, showingText }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <InvoiceTable
        invoices={invoices}
        onViewDetails={onViewDetails}
        onDelete={onDelete}
        onStamp={onStamp}
      />
    </CardContent>
    <CardFooter>
      <div className="text-xs text-muted-foreground">
        {showingText}
      </div>
    </CardFooter>
  </Card>
);

export default InvoiceCard;
