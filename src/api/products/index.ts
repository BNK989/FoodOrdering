import { supabase } from '@/src/lib/supabase'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useProductList = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data, error } = await supabase.from('products').select('*')
            if (error) throw new Error(error.message)
            return data
        },
    })
}

export const useProduct = (id: number | null = 0) => {
    return useQuery({
        queryKey: ['products', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single()
            if (error) throw new Error(error.message)
            return data
        },
    })
}

export const useInsertProduct = () => {
    const queryClient = useQueryClient()

    return useMutation({
        async mutationFn(data: any) {
            const { data: newProduct, error } = await supabase
                .from('products')
                .insert({
                    name: data.title,
                    image: data.image,
                    price: data.price,
                })
                .single()

            if (error) throw new Error(error.message)
            return newProduct
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['products'] })
        },
        //onError(err)
    })
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient()

    return useMutation({
        async mutationFn(data: any) {
            const { data: updatedProduct, error } = await supabase
                .from('products')
                .update({
                    name: data.title,
                    image: data.image,
                    price: data.price,
                })
                .eq('id', data.id)
                .select()
                .single()

            if (error) throw new Error(error.message)
            return updatedProduct
        },
        async onSuccess(_, { id }) {
            await queryClient.invalidateQueries({ queryKey: ['products'] })
            await queryClient.invalidateQueries({ queryKey: ['products', id] })
        },
        //onError(err)
    })
}
