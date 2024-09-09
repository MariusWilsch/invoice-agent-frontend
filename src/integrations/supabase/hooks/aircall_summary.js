import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### aircall_summary

This is the production database table for the Aircall Summary project.

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
| duration             | smallint                 | integer                   | false    |
| cost_in_usd          | text                     | string                    | false    |
| transcription        | text                     | string                    | false    |
| provider             | text                     | string                    | false    |

Note: call_uuid is the Primary Key.
*/

export const useAircallSummary = () => useQuery({
  queryKey: ['aircall_summary'],
  queryFn: () => fromSupabase(supabase.from('aircall_summary').select('*')),
});

export const useAddAircallSummary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newItem) => fromSupabase(supabase.from('aircall_summary').insert([newItem])),
    onSuccess: () => {
      queryClient.invalidateQueries('aircall_summary');
    },
  });
};

export const useUpdateAircallSummary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ call_uuid, ...updateData }) => fromSupabase(supabase.from('aircall_summary').update(updateData).eq('call_uuid', call_uuid)),
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