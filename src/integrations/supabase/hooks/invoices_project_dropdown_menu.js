import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### invoices_project_dropdown_menu

Related to the invoices table.

| name       | type                     | format | required |
|------------|--------------------------|--------|----------|
| id         | uuid                     | string | true     |
| field_type | text                     | string | true     |
| value      | text                     | string | true     |
| created_at | timestamp with time zone | string | true     |

Foreign Key Relationships:
- No explicit foreign key relationships defined in the schema
*/

export const useInvoicesProjectDropdownMenu = () => useQuery({
  queryKey: ['invoices_project_dropdown_menu'],
  queryFn: () => fromSupabase(supabase.from('invoices_project_dropdown_menu').select('*')),
});

export const useInvoiceProjectDropdownMenuById = (id) => useQuery({
  queryKey: ['invoices_project_dropdown_menu', id],
  queryFn: () => fromSupabase(supabase.from('invoices_project_dropdown_menu').select('*').eq('id', id).single()),
  enabled: !!id,
});

export const useAddInvoiceProjectDropdownMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newItem) => fromSupabase(supabase.from('invoices_project_dropdown_menu').insert([newItem])),
    onSuccess: () => {
      queryClient.invalidateQueries('invoices_project_dropdown_menu');
    },
  });
};

export const useUpdateInvoiceProjectDropdownMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedItem) => fromSupabase(supabase.from('invoices_project_dropdown_menu').update(updatedItem).eq('id', updatedItem.id)),
    onSuccess: () => {
      queryClient.invalidateQueries('invoices_project_dropdown_menu');
    },
  });
};

export const useDeleteInvoiceProjectDropdownMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => fromSupabase(supabase.from('invoices_project_dropdown_menu').delete().eq('id', id)),
    onSuccess: () => {
      queryClient.invalidateQueries('invoices_project_dropdown_menu');
    },
  });
};