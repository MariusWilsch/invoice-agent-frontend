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

// Hooks for life_cycle_done
export const useLifeCycleDone = () =>
  useQuery({
    queryKey: ["life_cycle_done"],
    queryFn: () => fromSupabase(supabase.from("life_cycle_done").select("*")),
  });

export const useAddLifeCycleDone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newItem) =>
      fromSupabase(supabase.from("life_cycle_done").insert([newItem])),
    onSuccess: () => {
      queryClient.invalidateQueries("life_cycle_done");
    },
  });
};

export const useUpdateLifeCycleDone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedItem) =>
      fromSupabase(
        supabase
          .from("life_cycle_done")
          .update(updatedItem)
          .eq("call_uuid", updatedItem.call_uuid)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("life_cycle_done");
    },
  });
};

export const useDeleteLifeCycleDone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (call_uuid) =>
      fromSupabase(
        supabase.from("life_cycle_done").delete().eq("call_uuid", call_uuid)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("life_cycle_done");
    },
  });
};

// Hooks for aircall_summary
export const useAircallSummary = () =>
  useQuery({
    queryKey: ["aircall_summary"],
    queryFn: () => fromSupabase(supabase.from("aircall_summary").select("*")),
  });

export const useAddAircallSummary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newItem) =>
      fromSupabase(supabase.from("aircall_summary").insert([newItem])),
    onSuccess: () => {
      queryClient.invalidateQueries("aircall_summary");
    },
  });
};

export const useUpdateAircallSummary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedItem) =>
      fromSupabase(
        supabase
          .from("aircall_summary")
          .update(updatedItem)
          .eq("call_uuid", updatedItem.call_uuid)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("aircall_summary");
    },
  });
};

export const useDeleteAircallSummary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (call_uuid) =>
      fromSupabase(
        supabase.from("aircall_summary").delete().eq("call_uuid", call_uuid)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("aircall_summary");
    },
  });
};

// Hooks for invoices_dev
export const useInvoicesDev = () =>
  useQuery({
    queryKey: ["invoices_dev"],
    queryFn: () => fromSupabase(supabase.from("invoices_dev").select("*")),
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

// Hooks for call_user_access
export const useCallUserAccess = () =>
  useQuery({
    queryKey: ["call_user_access"],
    queryFn: () => fromSupabase(supabase.from("call_user_access").select("*")),
  });

export const useAddCallUserAccess = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newItem) =>
      fromSupabase(supabase.from("call_user_access").insert([newItem])),
    onSuccess: () => {
      queryClient.invalidateQueries("call_user_access");
    },
  });
};

export const useUpdateCallUserAccess = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedItem) =>
      fromSupabase(
        supabase
          .from("call_user_access")
          .update(updatedItem)
          .eq("id", updatedItem.id)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("call_user_access");
    },
  });
};

export const useDeleteCallUserAccess = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      fromSupabase(supabase.from("call_user_access").delete().eq("id", id)),
    onSuccess: () => {
      queryClient.invalidateQueries("call_user_access");
    },
  });
};

// Hooks for aircall_summary_dev
export const useAircallSummaryDev = () =>
  useQuery({
    queryKey: ["aircall_summary_dev"],
    queryFn: () =>
      fromSupabase(supabase.from("aircall_summary_dev").select("*")),
  });

export const useAddAircallSummaryDev = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newItem) =>
      fromSupabase(supabase.from("aircall_summary_dev").insert([newItem])),
    onSuccess: () => {
      queryClient.invalidateQueries("aircall_summary_dev");
    },
  });
};

export const useUpdateAircallSummaryDev = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedItem) =>
      fromSupabase(
        supabase
          .from("aircall_summary_dev")
          .update(updatedItem)
          .eq("call_uuid", updatedItem.call_uuid)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("aircall_summary_dev");
    },
  });
};

export const useDeleteAircallSummaryDev = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (call_uuid) =>
      fromSupabase(
        supabase.from("aircall_summary_dev").delete().eq("call_uuid", call_uuid)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("aircall_summary_dev");
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

// Hooks for aircall_user_mappings
export const useAircallUserMappings = () =>
  useQuery({
    queryKey: ["aircall_user_mappings"],
    queryFn: () =>
      fromSupabase(supabase.from("aircall_user_mappings").select("*")),
  });

export const useAddAircallUserMapping = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newItem) =>
      fromSupabase(supabase.from("aircall_user_mappings").insert([newItem])),
    onSuccess: () => {
      queryClient.invalidateQueries("aircall_user_mappings");
    },
  });
};

export const useUpdateAircallUserMapping = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedItem) =>
      fromSupabase(
        supabase
          .from("aircall_user_mappings")
          .update(updatedItem)
          .eq("uuid", updatedItem.uuid)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("aircall_user_mappings");
    },
  });
};

export const useDeleteAircallUserMapping = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid) =>
      fromSupabase(
        supabase.from("aircall_user_mappings").delete().eq("uuid", uuid)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("aircall_user_mappings");
    },
  });
};
