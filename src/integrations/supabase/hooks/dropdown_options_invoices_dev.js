import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### dropdown_options_invoices_dev

This table is related to the invoices table.

| name       | type                     | format    | required |
|------------|--------------------------|-----------|----------|
| id         | uuid                     | string    | true     |
| field_type | text                     | string    | true     |
| value      | text                     | string    | true     |
| created_at | timestamp with time zone | string    | true     |

Note: id is the Primary Key.
*/

export const useDropdownOptionsInvoicesDev = () => useQuery({
  queryKey: ['dropdown_options_invoices_dev'],
  queryFn: () => fromSupabase(supabase.from('dropdown_options_invoices_dev').select('*')),
});

export const useAddDropdownOptionInvoicesDev = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newItem) => fromSupabase(supabase.from('dropdown_options_invoices_dev').insert([newItem])),
    onSuccess: () => {
      queryClient.invalidateQueries('dropdown_options_invoices_dev');
    },
  });
};

export const useUpdateDropdownOptionInvoicesDev = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('dropdown_options_invoices_dev').update(updateData).eq('id', id)),
    onSuccess: () => {
      queryClient.invalidateQueries('dropdown_options_invoices_dev');
    },
  });
};

export const useDeleteDropdownOptionInvoicesDev = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => fromSupabase(supabase.from('dropdown_options_invoices_dev').delete().eq('id', id)),
    onSuccess: () => {
      queryClient.invalidateQueries('dropdown_options_invoices_dev');
    },
  });
};