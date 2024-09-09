import { supabase } from './supabase.js';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth.jsx';

// Remove or comment out the import for non-existent hooks
// import { useInvoicesDev, useDeleteInvoicesDev } from './hooks/invoices_project.js';

export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  // Remove or comment out the exports for non-existent hooks
  // useInvoicesDev,
  // useDeleteInvoicesDev,
};