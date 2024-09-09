import { supabase } from './supabase';

// Import hooks for invoices_dev
import {
  useInvoicesDev,
  useAddInvoiceDev,
  useUpdateInvoiceDev,
  useDeleteInvoiceDev,
} from './hooks/invoices_dev';

// Import hooks for dropdown_options_invoices_dev
import {
  useDropdownOptionsInvoicesDev,
  useAddDropdownOptionInvoicesDev,
  useUpdateDropdownOptionInvoicesDev,
  useDeleteDropdownOptionInvoicesDev,
} from './hooks/dropdown_options_invoices_dev';

// Export all
export {
  supabase,
  useInvoicesDev,
  useAddInvoiceDev,
  useUpdateInvoiceDev,
  useDeleteInvoiceDev,
  useDropdownOptionsInvoicesDev,
  useAddDropdownOptionInvoicesDev,
  useUpdateDropdownOptionInvoicesDev,
  useDeleteDropdownOptionInvoicesDev,
};