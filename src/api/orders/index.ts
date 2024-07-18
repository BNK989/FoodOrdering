import { InsertTables, UpdateTables } from '@/src/types'
import { supabase } from '@/src/lib/supabase'
import { useAuth } from '@/src/providers/AuthProvider'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useAdminOrderList = ({ archived } = { archived: false }) => {
    const statuses = archived
        ? ['Archived', 'Canceled', 'Delivered']
        : ['New', 'Cooking', 'Delivering']

    return useQuery({
        queryKey: ['orders', { archived }],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .in('status', statuses)
                .order('created_at', { ascending: false })
            if (error) throw new Error(error.message)
            return data
        },
    })
}
export const useUserOrderList = () => {
    const { session } = useAuth()
    const id = session?.user.id
    return useQuery({
        queryKey: ['orders', { userId: id }],
        queryFn: async () => {
            if (!id) return
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', id)
                .order('created_at', { ascending: false })
            if (error) throw new Error(error.message)
            return data
        },
    })
}

export const useOrderDetails = (id: number = 0) => {
    return useQuery({
        queryKey: ['orders', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('orders')
                .select(
                    '*, order_items(id, product_id, qty, size, products(id, name, image, price))',
                )
                .eq('id', id)
                .single()
            if (error) throw new Error(error.message)
            return data
        },
    })
}

export const useInsertOrder = () => {
    const queryClient = useQueryClient()
    const { session } = useAuth()
    const userId = session?.user.id

    return useMutation({
        async mutationFn(data: InsertTables<'orders'>) {
            const { data: newProduct, error } = await supabase
                .from('orders')
                .insert({
                    ...data,
                    user_id: userId,
                })
                .select()
                .single()

            if (error) throw new Error(error.message)
            return newProduct
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['orders'] })
        },
        //onError(err)
    })
}

export const useUpdateOrder = () => {
    const queryClient = useQueryClient()

    return useMutation({
        async mutationFn({
            id,
            updatedFields,
        }: {
            id: number
            updatedFields: UpdateTables<'orders'>
        }) {
            const { data: updatedOrder, error } = await supabase
                .from('orders')
                .update(updatedFields)
                .eq('id', id)
                .select()
                .single()

            if (error) throw new Error(error.message)
            return updatedOrder
        },
        async onSuccess(_, { id }) {
            await queryClient.invalidateQueries({ queryKey: ['orders'] })
            await queryClient.invalidateQueries({ queryKey: ['orders', id] })
        },
    })
}
