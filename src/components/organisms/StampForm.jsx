import React from "react";
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import SelectField from "../molecules/SelectField";
import FormField from "../molecules/FormField";
import { useStampForm } from "../../hooks/useStampForm";
import { useTranslations } from "../../hooks/useTranslations";

const StampForm = ({ invoice, onClose }) => {
  const {
    formData,
    kostenstelleOptions,
    vbOptions,
    handleInputChange,
    handleSubmit,
    handleClear,
  } = useStampForm(invoice, onClose);

  const t = useTranslations();

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 h-full overflow-visible pr-4"
    >
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="space-y-4">
          <FormField label={t.receivedOn} id="eingegangen_am">
            <DatePickerDemo
              onChange={(date) => handleInputChange("eingegangen_am", date)}
              value={formData.eingegangen_am}
              placeholder={formData.eingegangen_am ? undefined : t.pickDate}
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
              className="border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded-md"
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
          <FormField label={t.comment} id="kommentar" className="flex-grow">
            <Textarea
              placeholder={`${t.enter} ${t.comment}`}
              className="h-full"
              onChange={(e) => handleInputChange("kommentar", e.target.value)}
              value={formData.kommentar}
            />
          </FormField>
          <FormField label={t.discount} id="skonto">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium w-12">
                {formData.skonto}%
              </span>
              <Slider
                id="skonto"
                min={0}
                max={40}
                step={5}
                value={[formData.skonto]}
                onValueChange={(newValue) =>
                  handleInputChange("skonto", newValue[0])
                }
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
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={handleClear}>
          {t.clear}
        </Button>
        <Button
          type="submit"
          variant="default"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {t.submit}
        </Button>
      </div>
    </form>
  );
};

export default StampForm;
