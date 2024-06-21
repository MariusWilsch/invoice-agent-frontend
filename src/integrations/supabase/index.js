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

### event

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| name       | text        | string | true     |
| created_at | timestamptz | string | true     |
| date       | date        | string | true     |

### user

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| username   | text        | string | true     |
| email      | text        | string | true     |
| created_at | timestamptz | string | true     |

### product

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| name       | text        | string | true     |
| price      | numeric     | number | true     |
| created_at | timestamptz | string | true     |

### order

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| user_id    | int8        | number | true     |
| product_id | int8        | number | true     |
| quantity   | int4        | number | true     |
| total      | numeric     | number | true     |
| created_at | timestamptz | string | true     |

*/

export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: () => fromSupabase(supabase.from('event').select('*')),
});

export const useEvent = (id) => useQuery({
    queryKey: ['event', id],
    queryFn: () => fromSupabase(supabase.from('event').select('*').eq('id', id).single()),
});

export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEvent) => fromSupabase(supabase.from('event').insert([newEvent])),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedEvent) => fromSupabase(supabase.from('event').update(updatedEvent).eq('id', updatedEvent.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('event').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => fromSupabase(supabase.from('user').select('*')),
});

export const useUser = (id) => useQuery({
    queryKey: ['user', id],
    queryFn: () => fromSupabase(supabase.from('user').select('*').eq('id', id).single()),
});

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('user').insert([newUser])),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedUser) => fromSupabase(supabase.from('user').update(updatedUser).eq('id', updatedUser.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('user').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useProducts = () => useQuery({
    queryKey: ['products'],
    queryFn: () => fromSupabase(supabase.from('product').select('*')),
});

export const useProduct = (id) => useQuery({
    queryKey: ['product', id],
    queryFn: () => fromSupabase(supabase.from('product').select('*').eq('id', id).single()),
});

export const useAddProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProduct) => fromSupabase(supabase.from('product').insert([newProduct])),
        onSuccess: () => {
            queryClient.invalidateQueries('products');
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedProduct) => fromSupabase(supabase.from('product').update(updatedProduct).eq('id', updatedProduct.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('products');
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('product').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('products');
        },
    });
};

export const useOrders = () => useQuery({
    queryKey: ['orders'],
    queryFn: () => fromSupabase(supabase.from('order').select('*')),
});

export const useOrder = (id) => useQuery({
    queryKey: ['order', id],
    queryFn: () => fromSupabase(supabase.from('order').select('*').eq('id', id).single()),
});

export const useAddOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newOrder) => fromSupabase(supabase.from('order').insert([newOrder])),
        onSuccess: () => {
            queryClient.invalidateQueries('orders');
        },
    });
};

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedOrder) => fromSupabase(supabase.from('order').update(updatedOrder).eq('id', updatedOrder.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('orders');
        },
    });
};

export const useDeleteOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('order').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('orders');
        },
    });
};