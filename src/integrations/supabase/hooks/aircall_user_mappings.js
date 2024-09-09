import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/*
### aircall_user_mappings

| name              | type   | format  | required |
|-------------------|--------|---------|----------|
| aircall_user_id   | text   | string  | true     |
| supabase_user_id  | uuid   | string  | true     |
| username          | text   | string  | true     |
| uuid              | uuid   | string  | true     |

Note: uuid is the Primary Key.
*/

export const useAircallUserMappings = () => useQuery({
  queryKey: ['aircall_user_mappings'],
  queryFn: () => fromSupabase(supabase.from('aircall_user_mappings').select('*')),
});

export const useAddAircallUserMapping = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newItem) => fromSupabase(supabase.from('aircall_user_mappings').insert([newItem])),
    onSuccess: () => {
      queryClient.invalidateQueries('aircall_user_mappings');
    },
  });
};

export const useUpdateAircallUserMapping = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ uuid, ...updateData }) => fromSupabase(supabase.from('aircall_user_mappings').update(updateData).eq('uuid', uuid)),
    onSuccess: () => {
      queryClient.invalidateQueries('aircall_user_mappings');
    },
  });
};

export const useDeleteAircallUserMapping = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid) => fromSupabase(supabase.from('aircall_user_mappings').delete().eq('uuid', uuid)),
    onSuccess: () => {
      queryClient.invalidateQueries('aircall_user_mappings');
    },
  });
};