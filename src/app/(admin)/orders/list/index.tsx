import OrderListItem from '@/components/OrderListItem'
import { useAdminOrderList } from '@/src/api/orders'
import { useInsertOrderSubscription } from '@/src/api/orders/subscription'
import { supabase } from '@/src/lib/supabase'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'

export default function OrdersScreen() {
    const { data: orders, error, isLoading } = useAdminOrderList()

    useInsertOrderSubscription()

    if (isLoading) return <ActivityIndicator size="large" color="#ddd" />
    if (error) return <Text>error while loading orders</Text>

    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                renderItem={({ item }) => <OrderListItem order={item} />}
                style={styles.list}
                contentContainerStyle={{ gap: 10, padding: 10 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        flex: 1,
        margin: 5,
        borderRadius: 10,
    },
    list: {
        gap: 10,
    },
})
