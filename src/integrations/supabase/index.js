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

### life_cycle_done

| name                 | type        | format | required |
|----------------------|-------------|--------|----------|
| created_at           | timestamptz | string | true     |
| state                | varchar     | string | false    |
| call_started         | timestamp   | string | true     |
| phone_num            | varchar     | string | true     |
| subject_line         | text        | string | false    |
| summary              | text        | string | false    |
| call_uuid            | varchar     | string | true     |
| form_submitted       | boolean     | boolean| true     |
| ticket_id            | varchar     | string | false    |
| initials             | varchar     | string | false    |
| key_data_full        | text        | string | false    |
| state_update_message | text        | string | false    |
| duration             | smallint    | number | false    |
| cost_in_usd          | text        | string | false    |
| transcription        | text        | string | false    |

### aircall_summary

| name                 | type        | format | required |
|----------------------|-------------|--------|----------|
| created_at           | timestamptz | string | true     |
| state                | varchar     | string | false    |
| call_started         | timestamp   | string | true     |
| phone_num            | varchar     | string | true     |
| subject_line         | text        | string | false    |
| summary              | text        | string | false    |
| call_uuid            | varchar     | string | true     |
| form_submitted       | boolean     | boolean| true     |
| ticket_id            | varchar     | string | false    |
| initials             | varchar     | string | false    |
| key_data_full        | text        | string | false    |
| state_update_message | text        | string | false    |
| duration             | smallint    | number | false    |
| cost_in_usd          | text        | string | false    |
| transcription        | text        | string | false    |

### invoices_dev

| name          | type        | format | required |
|---------------|-------------|--------|----------|
| id            | text        | string | true     |
| created_at    | timestamptz | string | true     |
| eingegangen_am| timestamptz | string | true     |
| konto         | text        | string | false    |
| ev_vp         | text        | string | false    |
| belegtext     | text        | string | false    |
| kommentar     | text        | string | false    |
| fällig_am     | date        | string | false    |
| gebucht       | date        | string | false    |
| kostenstelle  | text        | string | false    |
| VB            | text        | string | false    |
| wer_geprüft   | text        | string | false    |
| wer_bezahlt   | text        | string | false    |
| status        | text        | string | true     |
| amount        | real        | number | false    |
| sender        | text[]      | array  | false    |
| email_body    | text        | string | false    |
| public_url    | text        | string | false    |
| faellig_am    | timestamptz | string | false    |
| skonto        | smallint    | number | false    |

### aircall_summary_dev

| name                 | type        | format | required |
|----------------------|-------------|--------|----------|
| created_at           | timestamptz | string | true     |
| state                | varchar     | string | false    |
| call_started         | timestamp   | string | true     |
| phone_num            | varchar     | string | true     |
| subject_line         | text        | string | false    |
| summary              | text        | string | false    |
| call_uuid            | varchar     | string | true     |
| form_submitted       | boolean     | boolean| true     |
| ticket_id            | varchar     | string | false    |
| initials             | varchar     | string | false    |
| key_data_full        | text        | string | false    |
| state_update_message | text        | string | false    |
| duration             | smallint    | number | false    |
| cost_in_usd          | text        | string | false    |
| transcription        | text        | string | false    |

*/

// Hooks for life_cycle_done table
export const useLifeCycleDone = () => useQuery({
    queryKey: ['life_cycle_done'],
    queryFn: () => fromSupabase(supabase.from('life_cycle_done').select('*')),
});
export const useAddLifeCycleDone = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEntry) => fromSupabase(supabase.from('life_cycle_done').insert([newEntry])),
        onSuccess: () => {
            queryClient.invalidateQueries('life_cycle_done');
        },
    });
};
export const useUpdateLifeCycleDone = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedEntry) => fromSupabase(supabase.from('life_cycle_done').update(updatedEntry).eq('call_uuid', updatedEntry.call_uuid)),
        onSuccess: () => {
            queryClient.invalidateQueries('life_cycle_done');
        },
    });
};
export const useDeleteLifeCycleDone = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (call_uuid) => fromSupabase(supabase.from('life_cycle_done').delete().eq('call_uuid', call_uuid)),
        onSuccess: () => {
            queryClient.invalidateQueries('life_cycle_done');
        },
    });
};

// Hooks for aircall_summary table
export const useAircallSummary = () => useQuery({
    queryKey: ['aircall_summary'],
    queryFn: () => fromSupabase(supabase.from('aircall_summary').select('*')),
});
export const useAddAircallSummary = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEntry) => fromSupabase(supabase.from('aircall_summary').insert([newEntry])),
        onSuccess: () => {
            queryClient.invalidateQueries('aircall_summary');
        },
    });
};
export const useUpdateAircallSummary = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedEntry) => fromSupabase(supabase.from('aircall_summary').update(updatedEntry).eq('call_uuid', updatedEntry.call_uuid)),
        onSuccess: () => {
            queryClient.invalidateQueries('aircall_summary');
        },
    });
};
export const useDeleteAircallSummary = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (call_uuid) => fromSupabase(supabase.from('aircall_summary').delete().eq('call_uuid', call_uuid)),
        onSuccess: () => {
            queryClient.invalidateQueries('aircall_summary');
        },
    });
};

// Hooks for invoices_dev table
export const useInvoicesDev = () => useQuery({
    queryKey: ['invoices_dev'],
    queryFn: () => fromSupabase(supabase.from('invoices_dev').select('*')),
});
export const useAddInvoicesDev = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEntry) => fromSupabase(supabase.from('invoices_dev').insert([newEntry])),
        onSuccess: () => {
            queryClient.invalidateQueries('invoices_dev');
        },
    });
};
export const useUpdateInvoicesDev = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedEntry) => fromSupabase(supabase.from('invoices_dev').update(updatedEntry).eq('id', updatedEntry.id)),
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

// Hooks for aircall_summary_dev table
export const useAircallSummaryDev = () => useQuery({
    queryKey: ['aircall_summary_dev'],
    queryFn: () => fromSupabase(supabase.from('aircall_summary_dev').select('*')),
});
export const useAddAircallSummaryDev = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEntry) => fromSupabase(supabase.from('aircall_summary_dev').insert([newEntry])),
        onSuccess: () => {
            queryClient.invalidateQueries('aircall_summary_dev');
        },
    });
};
export const useUpdateAircallSummaryDev = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedEntry) => fromSupabase(supabase.from('aircall_summary_dev').update(updatedEntry).eq('call_uuid', updatedEntry.call_uuid)),
        onSuccess: () => {
            queryClient.invalidateQueries('aircall_summary_dev');
        },
    });
};
export const useDeleteAircallSummaryDev = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (call_uuid) => fromSupabase(supabase.from('aircall_summary_dev').delete().eq('call_uuid', call_uuid)),
        onSuccess: () => {
            queryClient.invalidateQueries('aircall_summary_dev');
        },
    });
};