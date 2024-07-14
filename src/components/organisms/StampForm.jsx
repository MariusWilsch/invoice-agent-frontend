import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import SelectField from "../molecules/SelectField";
import { toast } from "sonner";
import { useUpdateInvoicesDev } from "@/integrations/supabase/index.js";

const StampForm = ({ invoice, onClose }) => {
  const [skontoValue, setSkontoValue] = useState(invoice?.skonto || 0);
  const [formData, setFormData] = useState({
    id: invoice?.id, // Add this line to include the invoice ID
    eingegangen_am: invoice?.eingegangen_am || null,
    faellig_am: invoice?.faellig_am || null,
    konto: invoice?.konto || "",
    ev_vp: invoice?.ev_vp || "",
    belegtext: invoice?.belegtext || "",
    ticket_number: invoice?.ticket_number || "",
    kommentar: invoice?.kommentar || "",
    kostenstelle: invoice?.kostenstelle || "",
    vb: invoice?.VB || "",
  });

  const updateInvoiceMutation = useUpdateInvoicesDev();

  const kostenstelleOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const vbOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const isAnyFieldFilled = () => {
    return (
      Object.values(formData).some(
        (value) => value !== null && value !== "" && value !== undefined
      ) || skontoValue > 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isAnyFieldFilled()) {
      try {
        const updatedInvoice = {
          ...formData,
          skonto: skontoValue,
        };
        await updateInvoiceMutation.mutateAsync(updatedInvoice);
        toast.success("Form submitted successfully");
        onClose();
      } catch (error) {
        console.error("Error updating invoice:", error);
        toast.error("Failed to submit form");
      }
    } else {
      toast.error("Please fill at least one field before submitting");
    }
  };

  const handleClear = () => {
    setFormData({
      id: invoice?.id, // Preserve the invoice ID
      eingegangen_am: null,
      faellig_am: null,
      konto: "",
      ev_vp: "",
      belegtext: "",
      ticket_number: "",
      kommentar: "",
      kostenstelle: "",
      vb: "",
    });
    setSkontoValue(0);
    toast.info("Form cleared");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 h-full overflow-visible pr-4"
    >
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          <FormField label="Eingegangen am" id="eingegangen_am">
            <DatePickerDemo
              onChange={(date) => handleInputChange("eingegangen_am", date)}
              value={formData.eingegangen_am}
            />
          </FormField>

          <FormField label="Fällig am" id="faellig_am">
            <DatePickerDemo
              onChange={(date) => handleInputChange("faellig_am", date)}
              value={formData.faellig_am}
            />
          </FormField>

          <FormField label="Konto" id="konto">
            <Input
              placeholder="Enter Konto"
              onChange={(e) => handleInputChange("konto", e.target.value)}
              value={formData.konto}
            />
          </FormField>

          <FormField label="EV/VP" id="ev_vp">
            <Input
              placeholder="Enter EV/VP"
              onChange={(e) => handleInputChange("ev_vp", e.target.value)}
              value={formData.ev_vp}
            />
          </FormField>

          <FormField label="Belegtext" id="belegtext">
            <Input
              placeholder="Enter Belegtext"
              onChange={(e) => handleInputChange("belegtext", e.target.value)}
              value={formData.belegtext}
            />
          </FormField>

          <FormField label="Ticket Number" id="ticket_number">
            <Input
              placeholder="Enter Ticket Number"
              onChange={(e) =>
                handleInputChange("ticket_number", e.target.value)
              }
              value={formData.ticket_number}
            />
          </FormField>
        </div>

        {/* Right Column */}
        <div className="space-y-4 flex flex-col">
          <FormField label="Kommentar" id="kommentar" className="flex-grow">
            <Textarea
              placeholder="Enter Kommentar"
              className="h-full"
              onChange={(e) => handleInputChange("kommentar", e.target.value)}
              value={formData.kommentar}
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

            <SelectField
              label="Kostenstelle"
              id="kostenstelle"
              options={kostenstelleOptions}
              value={formData.kostenstelle}
              onChange={(value) => handleInputChange("kostenstelle", value)}
            />

            <SelectField
              label="VB"
              id="vb"
              options={vbOptions}
              value={formData.vb}
              onChange={(value) => handleInputChange("vb", value)}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={handleClear}>
          Clear
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

const FormField = ({ label, id, children, className }) => (
  <div className={`flex flex-col ${className}`}>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    {children}
  </div>
);

export default StampForm;
