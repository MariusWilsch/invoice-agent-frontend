import { supabase } from './supabase.js';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth.jsx';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchInvoicesProject = async () => {
  const { data, error } = await supabase
    .from('invoices_project')
    .select('*')
    .order('invoice_date', { ascending: false });
  if (error) throw error;
  return data;
};

const useInvoicesProject = () => {
  return useQuery({
    queryKey: ['invoices_project'],
    queryFn: fetchInvoicesProject,
  });
};

const deleteInvoiceProject = async (id) => {
  const { error } = await supabase
    .from('invoices_project')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

const useDeleteInvoiceProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteInvoiceProject,
    onSuccess: () => {
      queryClient.invalidateQueries(['invoices_project']);
    },
  });
};

const updateInvoiceProject = async (invoice) => {
  const { data, error } = await supabase
    .from('invoices_project')
    .update(invoice)
    .eq('id', invoice.id)
    .select();
  if (error) throw error;
  return data[0];
};

const useUpdateInvoiceProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateInvoiceProject,
    onSuccess: () => {
      queryClient.invalidateQueries(['invoices_project']);
    },
  });
};

const fetchDropdownOptionsInvoicesProject = async () => {
  const { data, error } = await supabase
    .from('invoices_project_dropdown')
    .select('*');
  if (error) throw error;
  return data;
};

const useDropdownOptionsInvoicesProject = () => {
  return useQuery({
    queryKey: ['dropdown_options_invoices_project'],
    queryFn: fetchDropdownOptionsInvoicesProject,
  });
};

const addDropdownOptionInvoicesProject = async (option) => {
  const { data, error } = await supabase
    .from('invoices_project_dropdown')
    .insert(option)
    .select();
  if (error) throw error;
  return data[0];
};

const useAddDropdownOptionInvoicesProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addDropdownOptionInvoicesProject,
    onSuccess: () => {
      queryClient.invalidateQueries(['dropdown_options_invoices_project']);
    },
  });
};

export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  useInvoicesProject,
  useDeleteInvoiceProject,
  useUpdateInvoiceProject,
  useDropdownOptionsInvoicesProject,
  useAddDropdownOptionInvoicesProject,
};