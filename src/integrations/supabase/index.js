import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### invoices_dev

| name            | type                    | format | required |
|-----------------|-------------------------|--------|----------|
| id              | text                    | string | true     |
| created_at      | timestamp with time zone| string | true     |
| eingegangen_am  | timestamp with time zone| string | true     |
| konto           | text                    | string | false    |
| ev_vp           | text                    | string | false    |
| belegtext       | text                    | string | false    |
| kommentar       | text                    | string | false    |
| fällig_am       | date                    | string | false    |
| gebucht         | date                    | string | false    |
| kostenstelle    | text                    | string | false    |
| vb              | text                    | string | false    |
| wer_geprüft     | text                    | string | false    |
| wer_bezahlt     | text                    | string | false    |
| status          | text                    | string | true     |
| amount          | real                    | number | false    |
| sender          | text[]                  | array  | false    |
| email_body      | text                    | string | false    |
| public_url      | text                    | string | false    |
| faellig_am      | timestamp with time zone| string | false    |
| skonto          | smallint                | number | false    |
| ticket_number   | text                    | string | false    |

*/

// Hooks for invoices_dev table

export const useInvoicesDev = () => useQuery({
    queryKey: ['invoices_dev'],
    queryFn: () => fromSupabase(supabase.from('invoices_dev').select('*')),
});

export const useInvoiceDevById = (id) => useQuery({
    queryKey: ['invoices_dev', id],
    queryFn: () => fromSupabase(supabase.from('invoices_dev').select('*').eq('id', id).single()),
    enabled: !!id,
});

export const useAddInvoiceDev = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newInvoice) => fromSupabase(supabase.from('invoices_dev').insert([newInvoice])),
        onSuccess: () => {
            queryClient.invalidateQueries('invoices_dev');
        },
    });
};

export const useUpdateInvoicesDev = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedInvoice) => fromSupabase(supabase.from('invoices_dev').update(updatedInvoice).eq('id', updatedInvoice.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('invoices_dev');
        },
    });
};

export const useDeleteInvoicesDev = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('invoices_dev').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('invoices_dev');
        },
    });
};