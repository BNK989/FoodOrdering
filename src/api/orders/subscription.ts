import { supabase } from '@/src/lib/supabase'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useInsertOrderSubscription = () => {
    const queryClient = useQueryClient()
    useEffect(() => {
        const ordersSub = supabase
            .channel('custom-insert-channel')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'orders' },
                (payload) => {
                    console.log('Change received!', payload)
                    queryClient.invalidateQueries({ queryKey: ['orders'] })
                },
            )
            .subscribe()

        return () => {
            supabase.removeChannel(ordersSub)
        }
    }, [])
}

export const useUpdateOrderSubscription = (id: number) => {
    const queryClient = useQueryClient()

    useEffect(() => {
        const ordersSub = supabase
            .channel('custom-filter-channel')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'orders',
                    filter: `id=eq.${id}`,
                },
                (payload) => {
                    queryClient.invalidateQueries({ queryKey: ['orders', id] })
                },
            )
            .subscribe()
    }, [])
}
