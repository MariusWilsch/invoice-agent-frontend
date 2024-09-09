import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### call_user_access

| name              | type                     | format    | required |
|-------------------|--------------------------|-----------|----------|
| id                | integer                  | integer   | true     |
| call_uuid         | character varying        | string    | false    |
| supabase_user_id  | uuid                     | string    | false    |
| created_at        | timestamp with time zone | string    | true     |

Note: 
- id is the Primary Key.
- call_uuid is a Foreign Key to `aircall_summary.call_uuid`.

Foreign Key Relationships:
- call_uuid references aircall_summary.call_uuid
*/

export const useCallUserAccess = () => useQuery({
  queryKey: ['call_user_access'],
  queryFn: () => fromSupabase(supabase.from('call_user_access').select('*')),
});

export const useAddCallUserAccess = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newItem) => fromSupabase(supabase.from('call_user_access').insert([newItem])),
    onSuccess: () => {
      queryClient.invalidateQueries('call_user_access');
    },
  });
};

export const useUpdateCallUserAccess = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('call_user_access').update(updateData).eq('id', id)),
    onSuccess: () => {
      queryClient.invalidateQueries('call_user_access');
    },
  });
};

export const useDeleteCallUserAccess = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => fromSupabase(supabase.from('call_user_access').delete().eq('id', id)),
    onSuccess: () => {
      queryClient.invalidateQueries('call_user_access');
    },
  });
};