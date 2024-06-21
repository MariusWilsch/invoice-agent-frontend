import React from "react";
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/date-picker";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const StampDrawer = ({ isOpen, onOpenChange }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      
      <SheetContent side="right" className="w-[45vw] min-w-[45vw]">
        <div className="p-4">
          <div className="font-semibold text-lg mb-4">Kontierungsstempel</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col mb-4">
              <Label htmlFor="eingegangen_am" className="mb-2">Eingegangen am</Label>
              <DatePickerDemo id="eingegangen_am" className="mb-4 w-full" />
            </div>
            <div className="flex flex-col mb-4">
              <Label htmlFor="faellig_am" className="mb-2">Fällig am</Label>
              <DatePickerDemo id="faellig_am" className="mb-4 w-full" />
            </div>
            <div className="flex flex-col mb-4">
              <Label htmlFor="gebucht" className="mb-2">Gebucht</Label>
              <DatePickerDemo id="gebucht" className="mb-4 w-full" />
            </div>
            <div className="flex flex-col mb-4">
              <Label htmlFor="konto" className="mb-2">Konto</Label>
              <Input id="konto" placeholder="Konto" className="mb-4 w-full" />
            </div>
            <div className="flex flex-col mb-4">
              <Label htmlFor="ev_vp" className="mb-2">EV/VP</Label>
              <Input id="ev_vp" placeholder="EV/VP" className="mb-4 w-full" />
            </div>
            <div className="flex flex-col mb-4">
              <Label htmlFor="belegtext" className="mb-2">Belegtext</Label>
              <Input id="belegtext" placeholder="Belegtext" className="mb-4 w-full" />
            </div>
            <div className="flex flex-col mb-4">
              <Label htmlFor="kommentar" className="mb-2">Kommentar</Label>
              <Input id="kommentar" placeholder="Kommentar" className="mb-4 w-full" />
            </div>
            <div className="flex flex-col mb-4">
              <Label htmlFor="skonto" className="mb-2">Skonto</Label>
              <Slider id="skonto" defaultValue={[0]} max={100} step={1} className="mb-4 w-full" />
            </div>
            <div className="flex flex-col mb-4">
              <Label htmlFor="kostenstelle" className="mb-2">Kostenstelle</Label>
              <Select>
                <SelectTrigger id="kostenstelle" className="mb-4 w-full">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option #1</SelectItem>
                  <SelectItem value="option2">Option #2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col mb-4">
              <Label htmlFor="vb" className="mb-2">VB</Label>
              <Select>
                <SelectTrigger id="vb" className="mb-4 w-full">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option #1</SelectItem>
                  <SelectItem value="option2">Option #2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="mt-4">Submit</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default StampDrawer;