import React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer";

const InvoiceDrawer = ({ selectedInvoice, setSelectedInvoice }) => {
  return (
    <Drawer open={!!selectedInvoice} onOpenChange={(isOpen) => { if (!isOpen) setSelectedInvoice(null); }}>
      <DrawerContent side="right" className="w-[45vw]">
        <div className="p-4">
          <div className="font-semibold text-lg mb-4">Invoice Information</div>
          <div className="grid gap-3">
            <div className="font-semibold">Invoice Details</div>
            <dl className="grid gap-3">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Eingegangen_am</dt>
                <dd>{selectedInvoice?.eingegangen_am || "None"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Konto</dt>
                <dd>{selectedInvoice?.konto || "None"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Ev/Vp</dt>
                <dd>{selectedInvoice?.ev_vp || "None"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Belegtext</dt>
                <dd>{selectedInvoice?.belegtext || "None"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Kommentar</dt>
                <dd>{selectedInvoice?.kommentar || "None"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Fällig_am</dt>
                <dd>{selectedInvoice?.fällig_am || "None"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Gebucht</dt>
                <dd>{selectedInvoice?.gebucht || "None"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Skonto</dt>
                <dd>{selectedInvoice?.skonto || "None"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Kostenstelle</dt>
                <dd>{selectedInvoice?.kostenstelle || "None"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">VB</dt>
                <dd>{selectedInvoice?.vb || "None"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">wer_geprüft</dt>
                <dd>{selectedInvoice?.wer_geprüft || "None"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">wer_bezahlt</dt>
                <dd>{selectedInvoice?.wer_bezahlt || "None"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Status</dt>
                <dd>{selectedInvoice?.status || "None"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Amount</dt>
                <dd>{selectedInvoice?.amount || "None"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Sender</dt>
                <dd>{selectedInvoice?.sender || "None"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Email_body</dt>
                <dd>{selectedInvoice?.email_body || "None"}</dd>
              </div>
            </dl>
          </div>
          <div className="mt-4">
            <Button variant="outline" onClick={() => setSelectedInvoice(null)}>Close</Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default InvoiceDrawer;