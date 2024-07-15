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

const InvoiceTable = ({ invoices, onViewDetails, onDelete, onStamp }) => {
  const renderSender = (sender) => {
    if (Array.isArray(sender) && sender.length > 1) {
      return (
        <div className="flex flex-col">
          <span>{sender[0]}</span>
          <span className="text-sm text-gray-500">{sender.slice(1).join(', ')}</span>
        </div>
      );
    }
    return Array.isArray(sender) ? sender.join(', ') : sender;
  };

  const renderAmount = (amount) => {
    if (typeof amount === 'object' && amount !== null && 'gross_amount' in amount && 'currency' in amount) {
      return `${amount.gross_amount} ${amount.currency}`;
    }
    return amount || 'N/A';
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/2">Absender</TableHead>
          <TableHead className="w-1/10">Ticket Nummer</TableHead>
          <TableHead className="w-1/10">Fällig am</TableHead>
          <TableHead className="w-1/10">Brutto</TableHead>
          <TableHead className="w-1/10">Status</TableHead>
          <TableHead className="w-1/10">Aktionen</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice, index) => (
          <TableRow key={invoice.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <TableCell className="w-1/2">{renderSender(invoice.sender)}</TableCell>
            <TableCell className="w-1/10">{invoice.ticket_number || 'N/A'}</TableCell>
            <TableCell className="w-1/10">{invoice.faellig_am || 'N/A'}</TableCell>
            <TableCell className="w-1/10">{renderAmount(invoice.amount)}</TableCell>
            <TableCell className="w-1/10">
              <StatusBadge status={invoice.status} />
            </TableCell>
            <TableCell className="w-1/10">
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
};

export default InvoiceTable;