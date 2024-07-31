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
        className="w-[45vw] min-w-[50vw] overflow-visible"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div className="p-4 h-full overflow-visible">
          <div className="font-semibold text-lg mb-4">{title}</div>
          <div className="h-[calc(100%-2rem)] overflow-visible">
            <StampForm invoice={invoice} onClose={() => onOpenChange(false)} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default StampSheet;
