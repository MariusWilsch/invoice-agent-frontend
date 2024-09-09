import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### invoices_project

Database holding the Invoices from the Invoice Agent Project

| name             | type                     | format                  | required |
|------------------|--------------------------|-------------------------|----------|
| id               | text                     | string                  | true     |
| created_at       | timestamp with time zone | string                  | true     |
| eingegangen_am   | timestamp with time zone | string                  | true     |
| konto            | text                     | string                  | false    |
| ev_vp            | text                     | string                  | false    |
| belegtext        | text                     | string                  | false    |
| kommentar        | text                     | string                  | false    |
| faellig_am       | date                     | string                  | false    |
| gebucht          | date                     | string                  | false    |
| kostenstelle     | text                     | string                  | false    |
| vb               | text                     | string                  | false    |
| wer_geprüft      | text                     | string                  | false    |
| wer_bezahlt      | text                     | string                  | false    |
| status           | text                     | string                  | true     |
| sender           | text[]                   | array                   | false    |
| email_body       | text                     | string                  | false    |
| public_url       | text                     | string                  | false    |
| skonto           | smallint                 | integer                 | false    |
| ticket_number    | text                     | string                  | false    |
| amount           | jsonb                    | object                  | false    |
| vat_rate         | text                     | string                  | false    |
| vat_id           | text                     | string                  | false    |
| vat_amount       | real                     | number                  | false    |
| invoice_number   | text                     | string                  | false    |
| invoice_date     | date                     | string                  | false    |
| payment_terms    | text                     | string                  | false    |
| cost_of_run      | real                     | number                  | false    |
| user_id          | uuid                     | string                  | false    |

Foreign Key Relationships:
- No explicit foreign key relationships defined in the schema
*/

export const useInvoicesProject = () => useQuery({
  queryKey: ['invoices_project'],
  queryFn: () => fromSupabase(supabase.from('invoices_project').select('*')),
});

export const useInvoiceProjectById = (id) => useQuery({
  queryKey: ['invoices_project', id],
  queryFn: () => fromSupabase(supabase.from('invoices_project').select('*').eq('id', id).single()),
  enabled: !!id,
});

export const useAddInvoiceProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newInvoice) => fromSupabase(supabase.from('invoices_project').insert([newInvoice])),
    onSuccess: () => {
      queryClient.invalidateQueries('invoices_project');
    },
  });
};

export const useUpdateInvoiceProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedInvoice) => fromSupabase(supabase.from('invoices_project').update(updatedInvoice).eq('id', updatedInvoice.id)),
    onSuccess: () => {
      queryClient.invalidateQueries('invoices_project');
    },
  });
};

export const useDeleteInvoiceProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => fromSupabase(supabase.from('invoices_project').delete().eq('id', id)),
    onSuccess: () => {
      queryClient.invalidateQueries('invoices_project');
    },
  });
};