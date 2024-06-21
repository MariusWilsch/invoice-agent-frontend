import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InvoiceActions from "./InvoiceActions";

const getStatusBadgeVariant = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Draft":
      return "warning";
    case "Archived":
      return "secondary";
    default:
      return "default";
  }
};

const InvoiceTable = ({ invoices, onViewDetails, onStampClick }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-2/4 whitespace-normal">Sender</TableHead>
          <TableHead className="w-1/4 whitespace-normal">Amount</TableHead>
          <TableHead className="w-1/4 whitespace-normal">Status</TableHead>
          <TableHead className="w-1/4 whitespace-normal">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="w-2/4 whitespace-normal">
              {invoice.sender && invoice.sender.length > 0 && (
                <>
                  <div>{invoice.sender[0]}</div>
                  {invoice.sender.length > 1 && <div>{invoice.sender[1]}</div>}
                </>
              )}
            </TableCell>
            <TableCell className="w-1/4 whitespace-normal">{invoice.amount}</TableCell>
            <TableCell className="w-1/4 whitespace-normal">
              <Badge variant={getStatusBadgeVariant(invoice.status)}>
                {invoice.status}
              </Badge>
            </TableCell>
            <TableCell className="w-1/4 whitespace-normal">
              <InvoiceActions
                invoice={invoice}
                onViewDetails={onViewDetails}
                onStampClick={onStampClick}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InvoiceTable;