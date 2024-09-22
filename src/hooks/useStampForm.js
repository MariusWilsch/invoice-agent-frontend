import { useReducer, useMemo, useCallback } from "react";
import {
  useUpdateInvoiceDev,
  useAddDropdownOptionInvoicesDev,
  useDropdownOptionsInvoicesDev,
  useUpdateDropdownOptionInvoicesDev,
  useDeleteDropdownOptionInvoicesDev,
} from "@/integrations/supabase/index.js";
import { toast } from "sonner";

const useDropdownOptions = (options, fieldType) => {
  return useMemo(
    () =>
      options
        ?.filter((option) => option.field_type === fieldType)
        .map((option) => ({ value: option.value, label: option.value })) || [],
    [options, fieldType]
  );
};

const initializeFormState = (invoice) => ({
  id: invoice?.id,
  eingegangen_am: invoice?.eingegangen_am || null,
  faellig_am: invoice?.faellig_am || null,
  konto: invoice?.konto || "",
  ev_vp: invoice?.ev_vp || "",
  belegtext: invoice?.belegtext || "",
  ticket_number: invoice?.ticket_number || "",
  kommentar: invoice?.kommentar || "",
  kostenstelle: invoice?.kostenstelle || "",
  vb: invoice?.vb || "",
  status: "Kontiert",
  skonto: invoice?.skonto || 0,
  fälligkeit_akzeptiert: invoice?.fälligkeit_akzeptiert || false,
});

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initializeFormState(action.invoice);
    default:
      return state;
  }
};

export const useStampForm = (invoice, onClose) => {
  const [formData, dispatch] = useReducer(
    formReducer,
    invoice,
    initializeFormState
  );
  const addDropdownOptionMutation = useAddDropdownOptionInvoicesDev();
  const updateDropdownOptionMutation = useUpdateDropdownOptionInvoicesDev();
  const deleteDropdownOptionMutation = useDeleteDropdownOptionInvoicesDev();
  const { data: dropdownOptions, refetch: refetchDropdownOptions } =
    useDropdownOptionsInvoicesDev();
  const updateInvoiceMutation = useUpdateInvoiceDev();

  const kostenstelleOptions = useDropdownOptions(
    dropdownOptions,
    "kostenstelle"
  );
  const vbOptions = useDropdownOptions(dropdownOptions, "vb");

  const handleInputChange = useCallback(
    async (field, value) => {
      dispatch({ type: "UPDATE_FIELD", field, value });

      if (!["kostenstelle", "vb"].includes(field)) return;
      if (
        dropdownOptions?.find(
          (option) => option.value === value && option.field_type === field
        )
      )
        return;

      try {
        await addDropdownOptionMutation.mutateAsync({
          field_type: field,
          value,
        });
        toast.success(`New ${field} option added successfully`);
        refetchDropdownOptions();
      } catch (error) {
        console.error(`Error adding new ${field} option:`, error);
        toast.error(`Failed to add new ${field} option`);
      }
    },
    [dropdownOptions, addDropdownOptionMutation, refetchDropdownOptions]
  );

  const handleEditOption = useCallback(
    async (fieldType, oldValue, newValue) => {
      try {
        await updateDropdownOptionMutation.mutateAsync({
          field_type: fieldType,
          old_value: oldValue,
          new_value: newValue,
        });
        toast.success(`${fieldType} option updated successfully`);
        refetchDropdownOptions();
      } catch (error) {
        console.error(`Error updating ${fieldType} option:`, error);
        toast.error(`Failed to update ${fieldType} option`);
      }
    },
    [updateDropdownOptionMutation, refetchDropdownOptions]
  );

  const handleDeleteOption = useCallback(
    async (fieldType, value) => {
      try {
        await deleteDropdownOptionMutation.mutateAsync({
          field_type: fieldType,
          value: value,
        });
        toast.success(`${fieldType} option deleted successfully`);
        refetchDropdownOptions();
      } catch (error) {
        console.error(`Error deleting ${fieldType} option:`, error);
        toast.error(`Failed to delete ${fieldType} option`);
      }
    },
    [deleteDropdownOptionMutation, refetchDropdownOptions]
  );

  const isAnyFieldFilled = useCallback(() => {
    return Object.values(formData).some(
      (value) => value !== null && value !== "" && value !== undefined
    );
  }, [formData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!isAnyFieldFilled()) {
        toast.error("Please fill at least one field before submitting");
        return;
      }

      try {
        await updateInvoiceMutation.mutateAsync(formData);
        toast.success("Form submitted successfully");
        onClose();
      } catch (error) {
        console.error("Error updating invoice:", error);
        toast.error("Failed to submit form");
      }
    },
    [formData, isAnyFieldFilled, updateInvoiceMutation, onClose]
  );

  const handleClear = useCallback(() => {
    dispatch({ type: "RESET", invoice });
    toast.info("Form cleared");
  }, [invoice]);

  return {
    formData,
    kostenstelleOptions,
    vbOptions,
    handleInputChange,
    handleSubmit,
    handleClear,
    handleEditOption,
    handleDeleteOption,
  };
};
