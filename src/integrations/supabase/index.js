import { createClient } from "@supabase/supabase-js";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
  return React.createElement(
    QueryClientProvider,
    { client: queryClient },
    children
  );
}

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/* supabase integration types

### life_cycle_done

| name                 | type                     | format                    | required |
|----------------------|--------------------------|---------------------------|----------|
| created_at           | timestamp with time zone | string                    | true     |
| state                | character varying        | string                    | false    |
| call_started         | timestamp without time zone | string                 | true     |
| phone_num            | character varying        | string                    | true     |
| subject_line         | text                     | string                    | false    |
| summary              | text                     | string                    | false    |
| call_uuid            | character varying        | string                    | true     |
| form_submitted       | boolean                  | boolean                   | true     |
| ticket_id            | character varying        | string                    | false    |
| initials             | character varying        | string                    | false    |
| key_data_full        | text                     | string                    | false    |
| state_update_message | text                     | string                    | false    |
| duration             | smallint                 | number                    | false    |
| cost_in_usd          | text                     | string                    | false    |
| transcription        | text                     | string                    | false    |

### aircall_summary

| name                 | type                     | format                    | required |
|----------------------|--------------------------|---------------------------|----------|
| created_at           | timestamp with time zone | string                    | true     |
| state                | character varying        | string                    | false    |
| call_started         | timestamp without time zone | string                 | true     |
| phone_num            | character varying        | string                    | true     |
| subject_line         | text                     | string                    | false    |
| summary              | text                     | string                    | false    |
| call_uuid            | character varying        | string                    | true     |
| form_submitted       | boolean                  | boolean                   | true     |
| ticket_id            | character varying        | string                    | false    |
| initials             | character varying        | string                    | false    |
| key_data_full        | text                     | string                    | false    |
| state_update_message | text                     | string                    | false    |
| duration             | smallint                 | number                    | false    |
| cost_in_usd          | text                     | string                    | false    |
| transcription        | text                     | string                    | false    |
| provider             | text                     | string                    | false    |

### invoices_dev

| name           | type                     | format                    | required |
|----------------|--------------------------|---------------------------|----------|
| id             | text                     | string                    | true     |
| created_at     | timestamp with time zone | string                    | true     |
| eingegangen_am | timestamp with time zone | string                    | true     |
| konto          | text                     | string                    | false    |
| ev_vp          | text                     | string                    | false    |
| belegtext      | text                     | string                    | false    |
| kommentar      | text                     | string                    | false    |
| faellig_am     | date                     | string                    | false    |
| gebucht        | date                     | string                    | false    |
| kostenstelle   | text                     | string                    | false    |
| vb             | text                     | string                    | false    |
| wer_geprüft    | text                     | string                    | false    |
| wer_bezahlt    | text                     | string                    | false    |
| status         | text                     | string                    | true     |
| sender         | text[]                   | array                     | false    |
| email_body     | text                     | string                    | false    |
| public_url     | text                     | string                    | false    |
| skonto         | smallint                 | number                    | false    |
| ticket_number  | text                     | string                    | false    |
| amount         | jsonb                    | object                    | false    |
| vat_rate       | text                     | string                    | false    |
| vat_id         | text                     | string                    | false    |
| vat_amount     | real                     | number                    | false    |
| invoice_number | text                     | string                    | false    |
| invoice_date   | date                     | string                    | false    |
| payment_terms  | text                     | string                    | false    |
| cost_of_run    | real                     | number                    | false    |

### dropdown_options_invoices_dev

| name       | type                     | format                    | required |
|------------|--------------------------|---------------------------|----------|
| id         | uuid                     | string                    | true     |
| field_type | text                     | string                    | true     |
| label      | text                     | string                    | true     |
| value      | text                     | string                    | true     |
| created_at | timestamp with time zone | string                    | true     |

*/

// Hooks for invoices_dev
export const useInvoicesDev = () =>
  useQuery({
    queryKey: ["invoices_dev"],
    queryFn: () => fromSupabase(supabase.from("invoices_dev").select("*").order('invoice_date', { ascending: false })),
  });

export const useAddInvoicesDev = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newItem) =>
      fromSupabase(supabase.from("invoices_dev").insert([newItem])),
    onSuccess: () => {
      queryClient.invalidateQueries("invoices_dev");
    },
  });
};

export const useUpdateInvoicesDev = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedItem) =>
      fromSupabase(
        supabase
          .from("invoices_dev")
          .update(updatedItem)
          .eq("id", updatedItem.id)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("invoices_dev");
    },
  });
};

export const useDeleteInvoicesDev = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      fromSupabase(supabase.from("invoices_dev").delete().eq("id", id)),
    onSuccess: () => {
      queryClient.invalidateQueries("invoices_dev");
    },
  });
};

// Hooks for dropdown_options_invoices_dev
export const useDropdownOptionsInvoicesDev = () =>
  useQuery({
    queryKey: ["dropdown_options_invoices_dev"],
    queryFn: () =>
      fromSupabase(supabase.from("dropdown_options_invoices_dev").select("*")),
  });

export const useAddDropdownOptionInvoicesDev = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newItem) =>
      fromSupabase(
        supabase.from("dropdown_options_invoices_dev").insert([newItem])
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("dropdown_options_invoices_dev");
    },
  });
};

export const useUpdateDropdownOptionInvoicesDev = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedItem) =>
      fromSupabase(
        supabase
          .from("dropdown_options_invoices_dev")
          .update(updatedItem)
          .eq("id", updatedItem.id)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("dropdown_options_invoices_dev");
    },
  });
};

export const useDeleteDropdownOptionInvoicesDev = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      fromSupabase(
        supabase.from("dropdown_options_invoices_dev").delete().eq("id", id)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("dropdown_options_invoices_dev");
    },
  });
};

