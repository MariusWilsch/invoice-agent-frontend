import React, { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import StampForm from "./organisms/StampForm";
import { useLanguage } from "../contexts/LanguageContext";

const StampSheet = ({ isOpen, onOpenChange, invoice }) => {
  const { language } = useLanguage();
  const [showMenuBar, setShowMenuBar] = useState(true);
  const title = language === 'de' ? "Kontierungsstempel" : "Accounting Stamp";
  const toggleText = language === 'de' ? "Menüleiste umschalten" : "Toggle Menu Bar";

  const toggleMenuBar = () => {
    setShowMenuBar(!showMenuBar);
  };

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
              <div className="mb-2">
                <Button onClick={toggleMenuBar} variant="outline" size="sm">
                  {showMenuBar ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                  {toggleText}
                </Button>
              </div>
              {invoice && invoice.public_url && (
                <iframe
                  src={`${invoice.public_url}#toolbar=${showMenuBar ? '1' : '0'}`}
                  title="Invoice PDF"
                  className="w-full h-[calc(100%-40px)] border-0"
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
