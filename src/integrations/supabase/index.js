import { supabase } from './supabase';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth';

// Import all hooks
import {
  useLifeCycleDone,
  useAddLifeCycleDone,
  useUpdateLifeCycleDone,
  useDeleteLifeCycleDone,
} from './hooks/life_cycle_done';

import {
  useAircallSummary,
  useAddAircallSummary,
  useUpdateAircallSummary,
  useDeleteAircallSummary,
} from './hooks/aircall_summary';

import {
  useInvoicesDev,
  useAddInvoiceDev,
  useUpdateInvoiceDev,
  useDeleteInvoiceDev,
} from './hooks/invoices_dev';

import {
  useCallUserAccess,
  useAddCallUserAccess,
  useUpdateCallUserAccess,
  useDeleteCallUserAccess,
} from './hooks/call_user_access';

import {
  useAircallSummaryDev,
  useAddAircallSummaryDev,
  useUpdateAircallSummaryDev,
  useDeleteAircallSummaryDev,
} from './hooks/aircall_summary_dev';

import {
  useDropdownOptionsInvoicesDev,
  useAddDropdownOptionInvoicesDev,
  useUpdateDropdownOptionInvoicesDev,
  useDeleteDropdownOptionInvoicesDev,
} from './hooks/dropdown_options_invoices_dev';

import {
  useAircallUserMappings,
  useAddAircallUserMapping,
  useUpdateAircallUserMapping,
  useDeleteAircallUserMapping,
} from './hooks/aircall_user_mappings';

// Export all
export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  useLifeCycleDone,
  useAddLifeCycleDone,
  useUpdateLifeCycleDone,
  useDeleteLifeCycleDone,
  useAircallSummary,
  useAddAircallSummary,
  useUpdateAircallSummary,
  useDeleteAircallSummary,
  useInvoicesDev,
  useAddInvoiceDev,
  useUpdateInvoiceDev,
  useDeleteInvoiceDev,
  useCallUserAccess,
  useAddCallUserAccess,
  useUpdateCallUserAccess,
  useDeleteCallUserAccess,
  useAircallSummaryDev,
  useAddAircallSummaryDev,
  useUpdateAircallSummaryDev,
  useDeleteAircallSummaryDev,
  useDropdownOptionsInvoicesDev,
  useAddDropdownOptionInvoicesDev,
  useUpdateDropdownOptionInvoicesDev,
  useDeleteDropdownOptionInvoicesDev,
  useAircallUserMappings,
  useAddAircallUserMapping,
  useUpdateAircallUserMapping,
  useDeleteAircallUserMapping,
};