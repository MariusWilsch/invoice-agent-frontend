import React from "react";
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/date-picker";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const StampDrawer = ({ isOpen, onOpenChange }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[45vw] min-w-[45vw]">
        <div className="p-4">
          <div className="font-semibold text-lg mb-4">Kontierungsstempel</div>
          <div className="grid gap-3">
            <div className="grid gap-4">
              <div className="flex flex-col">
                <Label htmlFor="eingegangen_am">Eingegangen am</Label>
                <DatePickerDemo id="eingegangen_am" />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="faellig_am">Fällig am</Label>
                <DatePickerDemo id="faellig_am" />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="gebucht">Gebucht</Label>
                <DatePickerDemo id="gebucht" />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="konto">Konto</Label>
                <Input id="konto" placeholder="Konto" className="w-full" />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="ev_vp">EV/VP</Label>
                <Input id="ev_vp" placeholder="EV/VP" className="w-full" />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="belegtext">Belegtext</Label>
                <Input id="belegtext" placeholder="Belegtext" className="w-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Label htmlFor="kommentar">Kommentar</Label>
                  <Input id="kommentar" placeholder="Kommentar" className="w-full" />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="skonto">Skonto</Label>
                  <Slider id="skonto" defaultValue={[0]} max={100} step={1} className="w-full" />
                </div>
              </div>
              <div className="flex flex-col">
                <Label htmlFor="kostenstelle">Kostenstelle</Label>
                <Select>
                  <SelectTrigger id="kostenstelle" className="w-full">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option #1</SelectItem>
                    <SelectItem value="option2">Option #2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <Label htmlFor="vb">VB</Label>
                <Select>
                  <SelectTrigger id="vb" className="w-full">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option #1</SelectItem>
                    <SelectItem value="option2">Option #2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <Label htmlFor="ticket_number">Ticket Number</Label>
                <Input id="ticket_number" placeholder="Ticket Number" className="w-full" />
              </div>
            </div>
            <Button className="mt-4">Submit</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default StampDrawer;