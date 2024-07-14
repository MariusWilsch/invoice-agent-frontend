import React from 'react';
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const StampForm = () => (
  <form className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
      {/* Left Column */}
      <div className="space-y-4">
        <FormField label="Eingegangen am" id="eingegangen_am">
          <DatePickerDemo />
        </FormField>
        
        <FormField label="Fällig am" id="faellig_am">
          <DatePickerDemo />
        </FormField>
        
        <FormField label="Gebucht" id="gebucht">
          <DatePickerDemo />
        </FormField>
        
        <FormField label="Konto" id="konto">
          <Input placeholder="Enter Konto" />
        </FormField>
        
        <FormField label="EV/VP" id="ev_vp">
          <Input placeholder="Enter EV/VP" />
        </FormField>
        
        <FormField label="Belegtext" id="belegtext">
          <Input placeholder="Enter Belegtext" />
        </FormField>
      </div>
      
      {/* Right Column */}
      <div className="space-y-4">
        <FormField label="Kommentar" id="kommentar">
          <Textarea placeholder="Enter Kommentar" />
        </FormField>
        
        <FormField label="Skonto" id="skonto">
          <Slider defaultValue={[0]} max={100} step={1} />
        </FormField>
        
        <FormField label="Kostenstelle" id="kostenstelle">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Kostenstelle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        
        <FormField label="VB" id="vb">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select VB" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        
        <FormField label="Ticket Number" id="ticket_number">
          <Input placeholder="Enter Ticket Number" />
        </FormField>
      </div>
    </div>
    <Button type="submit" className="w-full">Submit</Button>
  </form>
);

const FormField = ({ label, id, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {children}
  </div>
);

export default StampForm;