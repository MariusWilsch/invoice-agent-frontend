import { supabase } from './supabase.js';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth.jsx';

import {
  useInvoicesProject,
  useInvoiceProjectById,
  useAddInvoiceProject,
  useUpdateInvoiceProject,
  useDeleteInvoiceProject,
} from './hooks/invoices_project.js';

import {
  useInvoicesProjectDropdownMenu,
  useInvoiceProjectDropdownMenuById,
  useAddInvoiceProjectDropdownMenu,
  useUpdateInvoiceProjectDropdownMenu,
  useDeleteInvoiceProjectDropdownMenu,
} from './hooks/invoices_project_dropdown_menu.js';

export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  useInvoicesProject,
  useInvoiceProjectById,
  useAddInvoiceProject,
  useUpdateInvoiceProject,
  useDeleteInvoiceProject,
  useInvoicesProjectDropdownMenu,
  useInvoiceProjectDropdownMenuById,
  useAddInvoiceProjectDropdownMenu,
  useUpdateInvoiceProjectDropdownMenu,
  useDeleteInvoiceProjectDropdownMenu,
};