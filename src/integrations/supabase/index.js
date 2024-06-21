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

/* supabase integration types

### notes

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| created_at | timestamptz | string | true     |
| title      | text        | string | false    |
| content    | text        | string | false    |
| color      | text        | string | false    |
| pinned     | boolean     | boolean| false    |

*/

// Hook to fetch all notes
export const useNotes = () => useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
        const { data, error } = await supabase.from('notes').select('*');
        if (error) throw new Error(error.message);
        return data;
    },
});

// Hook to fetch a single note by ID
export const useNote = (id) => useQuery({
    queryKey: ['notes', id],
    queryFn: async () => {
        const { data, error } = await supabase.from('notes').select('*').eq('id', id).single();
        if (error) throw new Error(error.message);
        return data;
    },
});

// Hook to create a new note
export const useAddNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newNote) => {
            const { data, error } = await supabase.from('notes').insert([newNote]);
            if (error) throw new Error(error.message);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('notes');
        },
    });
};

// Hook to update an existing note
export const useUpdateNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updatedNote) => {
            const { data, error } = await supabase.from('notes').update(updatedNote).eq('id', updatedNote.id);
            if (error) throw new Error(error.message);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('notes');
        },
    });
};

// Hook to delete a note
export const useDeleteNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { data, error } = await supabase.from('notes').delete().eq('id', id);
            if (error) throw new Error(error.message);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('notes');
        },
    });
};