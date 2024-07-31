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

### invoices_dev

| name           | type                    | format | required |
|----------------|-------------------------|--------|----------|
| id             | text                    | string | true     |
| created_at     | timestamp with time zone| string | true     |
| eingegangen_am | timestamp with time zone| string | true     |
| konto          | text                    | string | false    |
| ev_vp          | text                    | string | false    |
| belegtext      | text                    | string | false    |
| kommentar      | text                    | string | false    |
| faellig_am     | date                    | string | false    |
| gebucht        | date                    | string | false    |
| kostenstelle   | text                    | string | false    |
| vb             | text                    | string | false    |
| wer_geprüft    | text                    | string | false    |
| wer_bezahlt    | text                    | string | false    |
| status         | text                    | string | true     |
| sender         | text[]                  | array  | false    |
| email_body     | text                    | string | false    |
| public_url     | text                    | string | false    |
| skonto         | smallint                | number | false    |
| ticket_number  | text                    | string | false    |
| amount         | jsonb                   | object | false    |
| vat_rate       | smallint                | number | false    |
| vat_id         | text                    | string | false    |
| vat_amount     | smallint                | number | false    |
| invoice_number | text                    | string | false    |
| invoice_date   | date                    | string | false    |

*/

// Hooks for invoices_dev

export const useInvoicesDev = () =>
  useQuery({
    queryKey: ["invoices_dev"],
    queryFn: () => fromSupabase(supabase.from("invoices_dev").select("*")),
  });

export const useAddInvoicesDev = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newInvoice) =>
      fromSupabase(supabase.from("invoices_dev").insert([newInvoice])),
    onSuccess: () => {
      queryClient.invalidateQueries("invoices_dev");
    },
  });
};

export const useUpdateInvoicesDev = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedInvoice) =>
      fromSupabase(
        supabase
          .from("invoices_dev")
          .update(updatedInvoice)
          .eq("id", updatedInvoice.id)
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

export const useInvoiceDevById = (id) =>
  useQuery({
    queryKey: ["invoices_dev", id],
    queryFn: () =>
      fromSupabase(
        supabase.from("invoices_dev").select("*").eq("id", id).single()
      ),
    enabled: !!id,
  });

// Hooks for dropdown_options_invoices_dev

export const useDropdownOptionsInvoicesDev = (fieldType) =>
  useQuery({
    queryKey: ["dropdown_options_invoices_dev", fieldType],
    queryFn: () =>
      fromSupabase(
        supabase
          .from("dropdown_options_invoices_dev")
          .select("*")
          .eq("field_type", fieldType)
      ),
    enabled: !!fieldType,
  });

export const useAddDropdownOptionInvoicesDev = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newOption) =>
      fromSupabase(supabase.from("dropdown_options_invoices_dev").insert([newOption])),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["dropdown_options_invoices_dev", variables.field_type]);
    },
  });
};

export const useUpdateDropdownOptionInvoicesDev = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedOption) =>
      fromSupabase(
        supabase
          .from("dropdown_options_invoices_dev")
          .update(updatedOption)
          .eq("id", updatedOption.id)
      ),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["dropdown_options_invoices_dev", variables.field_type]);
    },
  });
};

export const useDeleteDropdownOptionInvoicesDev = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      fromSupabase(supabase.from("dropdown_options_invoices_dev").delete().eq("id", id)),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["dropdown_options_invoices_dev"]);
    },
  });
};
