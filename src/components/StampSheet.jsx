import React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import StampForm from "./organisms/StampForm";
import { useLanguage } from "../contexts/LanguageContext";

const StampSheet = ({ isOpen, onOpenChange, invoice }) => {
  const { language } = useLanguage();
  const title = language === 'de' ? "Kontierungsstempel" : "Accounting Stamp";

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange} modal={false}>
      <SheetContent
        side="right"
        className="w-[90vw] min-w-[90vw] h-screen overflow-hidden transition-all duration-300"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div className="flex flex-col h-full">
          <div className="font-semibold text-lg mb-4">{title}</div>
          <div className="flex-grow flex overflow-hidden">
            <div className="w-1/2 overflow-y-auto pr-2">
              <StampForm 
                invoice={invoice} 
                onClose={() => onOpenChange(false)}
              />
            </div>
            <div className="w-1/2 overflow-hidden pl-2">
              {invoice && invoice.public_url && (
                <iframe
                  src={invoice.public_url}
                  title="Invoice PDF"
                  className="w-full h-full border-0"
                />
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default StampSheet;
