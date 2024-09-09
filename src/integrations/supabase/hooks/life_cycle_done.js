import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### life_cycle_done

This table stores the `delete` and `support appointment created` states. These calls are done and can be deleted in 7 days.

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

export const useLifeCycleDone = () => useQuery({
  queryKey: ['life_cycle_done'],
  queryFn: () => fromSupabase(supabase.from('life_cycle_done').select('*')),
});

export const useAddLifeCycleDone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newItem) => fromSupabase(supabase.from('life_cycle_done').insert([newItem])),
    onSuccess: () => {
      queryClient.invalidateQueries('life_cycle_done');
    },
  });
};

export const useUpdateLifeCycleDone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ call_uuid, ...updateData }) => fromSupabase(supabase.from('life_cycle_done').update(updateData).eq('call_uuid', call_uuid)),
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