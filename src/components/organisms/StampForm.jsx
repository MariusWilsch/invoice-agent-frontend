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

  const renderFormField = (label, id, component) => (
    <FormField label={label} id={id}>
      {component}
    </FormField>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 h-full overflow-visible pr-4"
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <div className="space-y-4">
          {renderFormField(t.receivedOn, "eingegangen_am", (
            <DatePickerDemo
              onChange={(date) => handleInputChange("eingegangen_am", date)}
              value={formData.eingegangen_am}
              placeholder={formData.eingegangen_am ? undefined : t.pickDate}
            />
          ))}
          {renderFormField(t.account, "konto", (
            <Input
              placeholder={formData.konto ? undefined : t.enterAccount}
              onChange={(e) => handleInputChange("konto", e.target.value)}
              value={formData.konto}
            />
          ))}
          {renderFormField(t.documentText, "belegtext", (
            <Input
              placeholder={formData.belegtext ? undefined : t.enterDocumentText}
              onChange={(e) => handleInputChange("belegtext", e.target.value)}
              value={formData.belegtext}
            />
          ))}
          <SelectField
            label={t.costCenter}
            id="kostenstelle"
            options={kostenstelleOptions}
            value={formData.kostenstelle}
            onChange={(value) => handleInputChange("kostenstelle", value)}
            placeholder={formData.kostenstelle ? undefined : t.selectCostCenter}
          />
          {renderFormField(t.discount, "skonto", (
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
          ))}
        </div>
        <div className="space-y-4">
          {renderFormField(t.dueOn, "faellig_am", (
            <DatePickerDemo
              onChange={(date) => handleInputChange("faellig_am", date)}
              value={formData.faellig_am}
              placeholder={formData.faellig_am ? undefined : t.pickDate}
            />
          ))}
          {renderFormField(t.evVp, "ev_vp", (
            <Input
              placeholder={formData.ev_vp ? undefined : t.enterEvVp}
              onChange={(e) => handleInputChange("ev_vp", e.target.value)}
              value={formData.ev_vp}
            />
          ))}
          {renderFormField(t.ticketNumber, "ticket_number", (
            <Input
              placeholder={
                formData.ticket_number ? undefined : t.enterTicketNumber
              }
              onChange={(e) =>
                handleInputChange("ticket_number", e.target.value)
              }
              value={formData.ticket_number}
            />
          ))}
          <SelectField
            label={t.vb}
            id="vb"
            options={vbOptions}
            value={formData.vb}
            onChange={(value) => handleInputChange("vb", value)}
            placeholder={formData.vb ? undefined : t.selectVb}
          />
          {renderFormField(t.comment, "kommentar", (
            <Textarea
              placeholder={formData.kommentar ? undefined : t.enterComment}
              onChange={(e) => handleInputChange("kommentar", e.target.value)}
              value={formData.kommentar}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-6">
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