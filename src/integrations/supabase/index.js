import { supabase } from './supabase';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth';

// Import hooks for invoices_dev and dropdown_options_invoices_dev
import {
  useInvoicesDev,
  useAddInvoiceDev,
  useUpdateInvoiceDev,
  useDeleteInvoiceDev,
} from './hooks/invoices_dev';

import {
  useDropdownOptionsInvoicesDev,
  useAddDropdownOptionInvoicesDev,
  useUpdateDropdownOptionInvoicesDev,
  useDeleteDropdownOptionInvoicesDev,
} from './hooks/dropdown_options_invoices_dev';

// Export all
export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  useInvoicesDev,
  useAddInvoiceDev,
  useUpdateInvoiceDev,
  useDeleteInvoiceDev,
  useDropdownOptionsInvoicesDev,
  useAddDropdownOptionInvoicesDev,
  useUpdateDropdownOptionInvoicesDev,
  useDeleteDropdownOptionInvoicesDev,
};