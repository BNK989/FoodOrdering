import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import OrderListItem from '@/components/OrderListItem'
import OrderItemListItem from '@/src/components/OrderItemListItem'
import { useOrderDetails } from '@/src/api/orders'
import { useUpdateOrderSubscription } from '@/src/api/orders/subscription'

export default function OrderDetailScreen() {
    const { id: idString } = useLocalSearchParams()
    const id = idString
        ? parseFloat(typeof idString === 'string' ? idString : idString?.[0])
        : 0

    const { data: order, error, isLoading } = useOrderDetails(id)
    useUpdateOrderSubscription(id)
    if (isLoading) return <ActivityIndicator size="large" color="#ddd" />
    if (error) return <Text>error while loading orders</Text>
    if (!order) return <Text>Order not found!</Text>

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Order #${order.id}` }} />

            <OrderListItem order={order} />

            <FlatList
                data={order.order_items}
                // @ts-ignore
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        gap: 10,
    },
})
