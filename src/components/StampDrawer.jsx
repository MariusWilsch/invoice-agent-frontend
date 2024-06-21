import React from "react";
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/date-picker";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const StampDrawer = ({ isOpen, onOpenChange }) => {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent side="right">
        <div className="p-4">
          <div className="font-semibold text-lg mb-4">Kontierungsstempel</div>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eingegangen_am">Eingegangen_am</Label>
                <DatePickerDemo id="eingegangen_am" />
              </div>
              <div>
                <Label htmlFor="faellig_am">Fällig_am</Label>
                <DatePickerDemo id="faellig_am" />
              </div>
              <div>
                <Label htmlFor="gebucht">Gebucht</Label>
                <DatePickerDemo id="gebucht" />
              </div>
              <div>
                <Label htmlFor="konto">Konto</Label>
                <Input id="konto" placeholder="Konto" />
              </div>
              <div>
                <Label htmlFor="ev_vp">EV/VP</Label>
                <Input id="ev_vp" placeholder="EV/VP" />
              </div>
              <div>
                <Label htmlFor="belegtext">Belegtext</Label>
                <Input id="belegtext" placeholder="Belegtext" />
              </div>
              <div>
                <Label htmlFor="kommentar">Kommentar</Label>
                <Input id="kommentar" placeholder="Kommentar" />
              </div>
              <div className="col-span-2">
                <Label htmlFor="skonto">Skonto</Label>
                <Slider id="skonto" defaultValue={[0]} max={100} step={1} />
              </div>
              <div>
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
              <div>
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
              <div>
                <Label htmlFor="ticket_number">Ticket Number</Label>
                <Input id="ticket_number" placeholder="Ticket Number" />
              </div>
            </div>
            <Button className="mt-4">Submit</Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default StampDrawer;