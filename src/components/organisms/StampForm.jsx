import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import SelectField from "../molecules/SelectField";
import { toast } from "sonner";
import { useUpdateInvoicesDev } from "@/integrations/supabase/index.js";
import { useLanguage } from "../../contexts/LanguageContext";

const StampForm = ({ invoice, onClose }) => {
  const { language } = useLanguage();
  const [skontoValue, setSkontoValue] = useState(invoice?.skonto || 0);
  const [formData, setFormData] = useState({
    id: invoice?.id,
    eingegangen_am: invoice?.eingegangen_am || null,
    faellig_am: invoice?.faellig_am || null,
    konto: invoice?.konto || "",
    ev_vp: invoice?.ev_vp || "",
    belegtext: invoice?.belegtext || "",
    ticket_number: invoice?.ticket_number || "",
    kommentar: invoice?.kommentar || "",
    kostenstelle: invoice?.kostenstelle || "",
    vb: invoice?.VB || "",
    status: "Kontiert",
  });

  const updateInvoiceMutation = useUpdateInvoicesDev();

  const kostenstelleOptions = [
    { value: "option1", label: language === 'de' ? "Option 1" : "Option 1" },
    { value: "option2", label: language === 'de' ? "Option 2" : "Option 2" },
    { value: "option3", label: language === 'de' ? "Option 3" : "Option 3" },
  ];

  const vbOptions = [
    { value: "option1", label: language === 'de' ? "Option 1" : "Option 1" },
    { value: "option2", label: language === 'de' ? "Option 2" : "Option 2" },
    { value: "option3", label: language === 'de' ? "Option 3" : "Option 3" },
  ];

  const translations = {
    de: {
      title: "Kontierungsstempel",
      receivedOn: "Eingegangen am",
      dueOn: "Fällig am",
      account: "Konto",
      evVp: "EV/VP",
      documentText: "Belegtext",
      ticketNumber: "Ticket Number",
      comment: "Kommentar",
      discount: "Skonto",
      costCenter: "Kostenstelle",
      vb: "VB",
      clear: "Löschen",
      submit: "Absenden",
      pickDate: "Datum auswählen",
      enter: "Eingeben",
      select: "Auswählen",
    },
    en: {
      title: "Accounting Stamp",
      receivedOn: "Received on",
      dueOn: "Due on",
      account: "Account",
      evVp: "EV/VP",
      documentText: "Document Text",
      ticketNumber: "Ticket Number",
      comment: "Comment",
      discount: "Discount",
      costCenter: "Cost Center",
      vb: "VB",
      clear: "Clear",
      submit: "Submit",
      pickDate: "Pick a date",
      enter: "Enter",
      select: "Select",
    }
  };

  const t = translations[language];

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
          status: "Kontiert", // Ensure status is set to "Kontiert"
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
      id: invoice?.id,
      eingegangen_am: null,
      faellig_am: null,
      konto: "",
      ev_vp: "",
      belegtext: "",
      ticket_number: "",
      kommentar: "",
      kostenstelle: "",
      vb: "",
      status: "Kontiert", // Keep the status as "Kontiert"
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
          <FormField label={t.receivedOn} id="eingegangen_am">
            <DatePickerDemo
              onChange={(date) => handleInputChange("eingegangen_am", date)}
              value={formData.eingegangen_am}
              placeholder={t.pickDate}
            />
          </FormField>

          <FormField label={t.dueOn} id="faellig_am">
            <DatePickerDemo
              onChange={(date) => handleInputChange("faellig_am", date)}
              value={formData.faellig_am}
              placeholder={t.pickDate}
            />
          </FormField>

          <FormField label={t.account} id="konto">
            <Input
              placeholder={`${t.enter} ${t.account}`}
              onChange={(e) => handleInputChange("konto", e.target.value)}
              value={formData.konto}
            />
          </FormField>

          <FormField label={t.evVp} id="ev_vp">
            <Input
              placeholder={`${t.enter} ${t.evVp}`}
              onChange={(e) => handleInputChange("ev_vp", e.target.value)}
              value={formData.ev_vp}
            />
          </FormField>

          <FormField label={t.documentText} id="belegtext">
            <Input
              placeholder={`${t.enter} ${t.documentText}`}
              onChange={(e) => handleInputChange("belegtext", e.target.value)}
              value={formData.belegtext}
            />
          </FormField>

          <FormField label={t.ticketNumber} id="ticket_number">
            <Input
              placeholder={`${t.enter} ${t.ticketNumber}`}
              onChange={(e) =>
                handleInputChange("ticket_number", e.target.value)
              }
              value={formData.ticket_number}
            />
          </FormField>
        </div>

        {/* Right Column */}
        <div className="space-y-4 flex flex-col">
          <FormField label={t.comment} id="kommentar" className="flex-grow">
            <Textarea
              placeholder={`${t.enter} ${t.comment}`}
              className="h-full"
              onChange={(e) => handleInputChange("kommentar", e.target.value)}
              value={formData.kommentar}
            />
          </FormField>

          <div className="space-y-4">
            <FormField label={t.discount} id="skonto">
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
              label={t.costCenter}
              id="kostenstelle"
              options={kostenstelleOptions}
              value={formData.kostenstelle}
              onChange={(value) => handleInputChange("kostenstelle", value)}
              placeholder={`${t.select} ${t.costCenter}`}
            />

            <SelectField
              label={t.vb}
              id="vb"
              options={vbOptions}
              value={formData.vb}
              onChange={(value) => handleInputChange("vb", value)}
              placeholder={`${t.select} ${t.vb}`}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={handleClear}>
          {t.clear}
        </Button>
        <Button type="submit">{t.submit}</Button>
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
