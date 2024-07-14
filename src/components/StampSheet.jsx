import React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import StampForm from "./organisms/StampForm";

const StampSheet = ({ isOpen, onOpenChange }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange} modal={false}>
      <SheetContent side="right" className="w-[45vw] min-w-[50vw]">
        <div className="p-4">
          <div className="font-semibold text-lg mb-4">Kontierungsstempel</div>
          <StampForm />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default StampSheet;