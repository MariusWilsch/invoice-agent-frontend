import { useReducer, useMemo, useCallback } from 'react';
import { useUpdateInvoiceDev, useAddDropdownOptionInvoicesDev, useDropdownOptionsInvoicesDev } from "@/integrations/supabase/index.js";
import { toast } from "sonner";

const useDropdownOptions = (options, fieldType) => {
  return useMemo(() => 
    options
      ?.filter(option => option.field_type === fieldType)
      .map(option => ({ value: option.value, label: option.value })) || [],
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
  vb: invoice?.VB || "",
  status: "Kontiert",
  skonto: invoice?.skonto || 0,
});

const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initializeFormState(action.invoice);
    default:
      return state;
  }
};

export const useStampForm = (invoice, onClose) => {
  const [formData, dispatch] = useReducer(formReducer, invoice, initializeFormState);
  const addDropdownOptionMutation = useAddDropdownOptionInvoicesDev();
  const { data: dropdownOptions } = useDropdownOptionsInvoicesDev();
  const updateInvoiceMutation = useUpdateInvoiceDev();

  const kostenstelleOptions = useDropdownOptions(dropdownOptions, 'kostenstelle');
  const vbOptions = useDropdownOptions(dropdownOptions, 'vb');

  const handleInputChange = useCallback(async (field, value) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });

    if (!['kostenstelle', 'vb'].includes(field)) return;
    if (dropdownOptions?.find(option => option.value === value && option.field_type === field)) return;

    try {
      await addDropdownOptionMutation.mutateAsync({ field_type: field, value });
      toast.success(`New ${field} option added successfully`);
    } catch (error) {
      console.error(`Error adding new ${field} option:`, error);
      toast.error(`Failed to add new ${field} option`);
    }
  }, [dropdownOptions, addDropdownOptionMutation]);

  const isAnyFieldFilled = useCallback(() => {
    return Object.values(formData).some(value => value !== null && value !== "" && value !== undefined);
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
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
  }, [formData, isAnyFieldFilled, updateInvoiceMutation, onClose]);

  const handleClear = useCallback(() => {
    dispatch({ type: 'RESET', invoice });
    toast.info("Form cleared");
  }, [invoice]);

  return {
    formData,
    kostenstelleOptions,
    vbOptions,
    handleInputChange,
    handleSubmit,
    handleClear,
  };
};