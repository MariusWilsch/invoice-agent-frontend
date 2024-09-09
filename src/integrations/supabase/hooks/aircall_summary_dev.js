import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### aircall_summary_dev

This is a duplicate of aircall_summary.

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

Note: call_uuid is the Primary Key.
*/

export const useAircallSummaryDev = () => useQuery({
  queryKey: ['aircall_summary_dev'],
  queryFn: () => fromSupabase(supabase.from('aircall_summary_dev').select('*')),
});

export const useAddAircallSummaryDev = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newItem) => fromSupabase(supabase.from('aircall_summary_dev').insert([newItem])),
    onSuccess: () => {
      queryClient.invalidateQueries('aircall_summary_dev');
    },
  });
};

export const useUpdateAircallSummaryDev = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ call_uuid, ...updateData }) => fromSupabase(supabase.from('aircall_summary_dev').update(updateData).eq('call_uuid', call_uuid)),
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