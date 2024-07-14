import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const StampForm = () => {
  const [skontoValue, setSkontoValue] = useState(0);
  const [formData, setFormData] = useState({
    eingegangen_am: null,
    faellig_am: null,
    konto: '',
    ev_vp: '',
    belegtext: '',
    ticket_number: '',
    kommentar: '',
    kostenstelle: '',
    vb: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isAnyFieldFilled = Object.values(formData).some(value => 
      value !== null && value !== '' && value !== undefined
    ) || skontoValue > 0;

    if (isAnyFieldFilled) {
      console.log('Form submitted:', { ...formData, skonto: skontoValue });
      toast.success('Form submitted successfully');
    } else {
      toast.error('Please fill at least one field before submitting');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 h-full overflow-visible pr-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          <FormField label="Eingegangen am" id="eingegangen_am">
            <DatePickerDemo 
              onChange={(date) => handleInputChange('eingegangen_am', date)}
            />
          </FormField>
          
          <FormField label="Fällig am" id="faellig_am">
            <DatePickerDemo 
              onChange={(date) => handleInputChange('faellig_am', date)}
            />
          </FormField>
          
          <FormField label="Konto" id="konto">
            <Input 
              placeholder="Enter Konto" 
              onChange={(e) => handleInputChange('konto', e.target.value)}
            />
          </FormField>
          
          <FormField label="EV/VP" id="ev_vp">
            <Input 
              placeholder="Enter EV/VP" 
              onChange={(e) => handleInputChange('ev_vp', e.target.value)}
            />
          </FormField>
          
          <FormField label="Belegtext" id="belegtext">
            <Input 
              placeholder="Enter Belegtext" 
              onChange={(e) => handleInputChange('belegtext', e.target.value)}
            />
          </FormField>

          <FormField label="Ticket Number" id="ticket_number">
            <Input 
              placeholder="Enter Ticket Number" 
              onChange={(e) => handleInputChange('ticket_number', e.target.value)}
            />
          </FormField>
        </div>
        
        {/* Right Column */}
        <div className="space-y-4 flex flex-col">
          <FormField label="Kommentar" id="kommentar" className="flex-grow">
            <Textarea 
              placeholder="Enter Kommentar" 
              className="h-full" 
              onChange={(e) => handleInputChange('kommentar', e.target.value)}
            />
          </FormField>
          
          <div className="space-y-4">
            <FormField label="Skonto" id="skonto">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium w-12">{skontoValue}%</span>
                <Slider
                  id="skonto"
                  min={0}
                  max={40}
                  step={5}
                  value={[skontoValue]}
                  onValueChange={(newValue) => setSkontoValue(newValue[0])}
                  className="flex-grow"
                />
              </div>
            </FormField>
            
            <FormField label="Kostenstelle" id="kostenstelle">
              <Select onValueChange={(value) => handleInputChange('kostenstelle', value)}>
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
              <Select onValueChange={(value) => handleInputChange('vb', value)}>
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
          </div>
        </div>
      </div>
      <Button type="submit" className="w-full">Submit</Button>
    </form>
  );
};

const FormField = ({ label, id, children, className }) => (
  <div className={`flex flex-col ${className}`}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {children}
  </div>
);

export default StampForm;