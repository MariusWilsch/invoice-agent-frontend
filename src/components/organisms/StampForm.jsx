import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const StampForm = () => {
  const [skontoValue, setSkontoValue] = useState(0);

  return (
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
        <div className="space-y-4 flex flex-col">
          <FormField label="Kommentar" id="kommentar" className="flex-grow">
            <Textarea placeholder="Enter Kommentar" className="h-full" />
          </FormField>
          
          <div>
            <FormField label="Skonto" id="skonto">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium w-12">{skontoValue}%</span>
                <Slider
                  id="skonto"
                  min={0}
                  max={100}
                  step={1}
                  value={[skontoValue]}
                  onValueChange={(newValue) => setSkontoValue(newValue[0])}
                  className="flex-grow"
                />
              </div>
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
      </div>
      <Button type="submit" className="w-full">Submit</Button>
    </form>
  );
};

const FormField = ({ label, id, children, className }) => (
  <div className={className}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {children}
  </div>
);

export default StampForm;