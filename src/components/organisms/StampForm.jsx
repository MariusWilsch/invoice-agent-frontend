import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import SelectField from "../molecules/SelectField";
import FormField from "../molecules/FormField";
import { useStampForm } from "../../hooks/useStampForm";
import { useTranslations } from "../../hooks/useTranslations";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from "lucide-react";

const StampForm = ({ invoice, onClose }) => {
  const {
    formData,
    kostenstelleOptions,
    vbOptions,
    handleInputChange,
    handleSubmit,
    handleClear,
    handleEditOption,
    handleDeleteOption,
  } = useStampForm(invoice, onClose);

  const t = useTranslations();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingOption, setEditingOption] = useState(null);
  const [deletingOption, setDeletingOption] = useState(null);
  const [newOptionValue, setNewOptionValue] = useState("");

  const renderFormField = (label, id, component) => (
    <FormField label={label} id={id}>
      {component}
    </FormField>
  );

  const handleEditClick = (option, fieldType) => {
    setEditingOption({ ...option, fieldType });
    setNewOptionValue(option.value);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (option, fieldType) => {
    setDeletingOption({ ...option, fieldType });
    setIsDeleteModalOpen(true);
  };

  const confirmEdit = () => {
    handleEditOption(
      editingOption.fieldType,
      editingOption.value,
      newOptionValue
    );
    setIsEditModalOpen(false);
  };

  const confirmDelete = () => {
    handleDeleteOption(deletingOption.fieldType, deletingOption.value);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 h-full overflow-visible pr-4"
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-4">
            {renderFormField(
              t.receivedOn,
              "eingegangen_am",
              <DatePickerDemo
                onChange={(date) => handleInputChange("eingegangen_am", date)}
                value={formData.eingegangen_am}
                placeholder={formData.eingegangen_am ? undefined : t.pickDate}
              />
            )}
            {renderFormField(
              t.account,
              "konto",
              <Input
                placeholder={formData.konto ? undefined : t.enterAccount}
                onChange={(e) => handleInputChange("konto", e.target.value)}
                value={formData.konto}
              />
            )}
            {renderFormField(
              t.documentText,
              "belegtext",
              <Input
                placeholder={
                  formData.belegtext ? undefined : t.enterDocumentText
                }
                onChange={(e) => handleInputChange("belegtext", e.target.value)}
                value={formData.belegtext}
              />
            )}
            <SelectField
              label={t.costCenter}
              id="kostenstelle"
              options={kostenstelleOptions}
              value={formData.kostenstelle}
              onChange={(value) => handleInputChange("kostenstelle", value)}
              placeholder={
                formData.kostenstelle ? undefined : t.selectCostCenter
              }
              onEditOption={(option) => handleEditClick(option, "kostenstelle")}
              onDeleteOption={(option) =>
                handleDeleteClick(option, "kostenstelle")
              }
            />
            {renderFormField(
              t.discount,
              "skonto",
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
            )}
          </div>
          <div className="space-y-4">
            {renderFormField(
              t.dueOn,
              "faellig_am",
              <div className="flex items-center space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Checkbox
                        id="fälligkeit_akzeptiert"
                        checked={formData.fälligkeit_akzeptiert}
                        onCheckedChange={(checked) =>
                          handleInputChange("fälligkeit_akzeptiert", checked)
                        }
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t.acceptDueDate}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <DatePickerDemo
                  onChange={(date) => handleInputChange("faellig_am", date)}
                  value={formData.faellig_am}
                  placeholder={formData.faellig_am ? undefined : t.pickDate}
                />
              </div>
            )}
            {renderFormField(
              t.evVp,
              "ev_vp",
              <Input
                placeholder={formData.ev_vp ? undefined : t.enterEvVp}
                onChange={(e) => handleInputChange("ev_vp", e.target.value)}
                value={formData.ev_vp}
              />
            )}
            {renderFormField(
              t.ticketNumber,
              "ticket_number",
              <Input
                placeholder={
                  formData.ticket_number ? undefined : t.enterTicketNumber
                }
                onChange={(e) =>
                  handleInputChange("ticket_number", e.target.value)
                }
                value={formData.ticket_number}
              />
            )}
            <SelectField
              label={t.vb}
              id="vb"
              options={vbOptions}
              value={formData.vb}
              onChange={(value) => handleInputChange("vb", value)}
              placeholder={formData.vb ? undefined : t.selectVb}
              onEditOption={(option) => handleEditClick(option, "vb")}
              onDeleteOption={(option) => handleDeleteClick(option, "vb")}
            />
            {renderFormField(
              t.comment,
              "kommentar",
              <Textarea
                placeholder={formData.kommentar ? undefined : t.enterComment}
                value={formData.kommentar}
                readOnly
                className="bg-gray-100"
              />
            )}
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

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.editOption}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newOptionValue}
              onChange={(e) => setNewOptionValue(e.target.value)}
              placeholder={t.enterNewValue}
            />
          </div>
          <DialogFooter>
            <Button onClick={() => setIsEditModalOpen(false)} variant="outline">
              {t.cancel}
            </Button>
            <Button onClick={confirmEdit}>{t.save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.deleteOption}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.deleteOptionConfirmation}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              {t.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default StampForm;
