import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

const InvoiceDetailsSheet = ({ isOpen, onOpenChange, invoice }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[60vw] sm:w-[60vw]">
        <SheetHeader>
          <SheetTitle>Invoice Details</SheetTitle>
          <SheetDescription>View the details of the selected invoice.</SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          {invoice ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Sender</h3>
                <p>{invoice.sender}</p>
              </div>
              <div>
                <h3 className="font-semibold">Amount</h3>
                <p>{invoice.amount}</p>
              </div>
              <div>
                <h3 className="font-semibold">Status</h3>
                <p>{invoice.status}</p>
              </div>
              <div>
                <h3 className="font-semibold">Created At</h3>
                <p>{new Date(invoice.created_at).toLocaleString()}</p>
              </div>
              <div>
                <h3 className="font-semibold">Due Date</h3>
                <p>{invoice.fällig_am ? new Date(invoice.fällig_am).toLocaleDateString() : 'Not set'}</p>
              </div>
              <div>
                <h3 className="font-semibold">Comments</h3>
                <p>{invoice.kommentar || 'No comments'}</p>
              </div>
            </div>
          ) : (
            <p>No invoice selected</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InvoiceDetailsSheet;