// Import all the relevant exports from other files in the supabase directory
import { supabase } from './supabase.js';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth.jsx';

// Import hooks from the newly created files
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

// Export all the imported functions and objects
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