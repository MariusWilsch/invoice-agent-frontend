import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from '../molecules/StatusBadge';
import ActionButtons from '../molecules/ActionButtons';

const InvoiceTable = ({ invoices, onViewDetails, onDelete, onStamp }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Sender</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {invoices.map((invoice, index) => (
        <TableRow key={invoice.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
          <TableCell>{invoice.sender}</TableCell>
          <TableCell>{invoice.amount}</TableCell>
          <TableCell>
            <StatusBadge status={invoice.status} />
          </TableCell>
          <TableCell>
            <ActionButtons
              invoice={invoice}
              onViewDetails={onViewDetails}
              onDelete={onDelete}
              onStamp={onStamp}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default InvoiceTable;