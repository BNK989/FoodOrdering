import { InsertTables } from '@/src/types'
import { supabase } from '@/src/lib/supabase'
import { useMutation } from '@tanstack/react-query'

export const useInsertOrderItems = () => {
    return useMutation({
        async mutationFn(items: InsertTables<'order_items'>[]) {
            const { data: newOrderItems, error } = await supabase
                .from('order_items')
                .insert(items)
                .select()

            if (error) throw new Error(error.message)
            return newOrderItems
        },
    })
}
