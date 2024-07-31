import React, { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import StampForm from "./organisms/StampForm";
import { useLanguage } from "../contexts/LanguageContext";

const StampSheet = ({ isOpen, onOpenChange, invoice }) => {
  const { language } = useLanguage();
  const title = language === 'de' ? "Kontierungsstempel" : "Accounting Stamp";
  const [isViewingInvoice, setIsViewingInvoice] = useState(false);

  const handleViewInvoice = () => {
    setIsViewingInvoice(true);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange} modal={false}>
      <SheetContent
        side="right"
        className="w-[90vw] h-[90vh] max-w-none overflow-y-auto"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div className="h-full flex flex-col">
          <div className="font-semibold text-lg mb-4">{title}</div>
          <div className="flex-grow overflow-y-auto">
            <StampForm 
              invoice={invoice} 
              onClose={() => onOpenChange(false)} 
              onViewInvoice={handleViewInvoice}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default StampSheet;
