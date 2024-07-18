import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'

import { OrderStatusList } from '@/src/types'

import OrderListItem from '@/components/OrderListItem'
import OrderItemListItem from '@/src/components/OrderItemListItem'
import { useOrderDetails, useUpdateOrder } from '@/src/api/orders'

export default function OrderDetailScreen() {
    const { id: idString } = useLocalSearchParams()
    const id = idString
        ? parseFloat(typeof idString === 'string' ? idString : idString?.[0])
        : 0

    const { data: order, error, isLoading } = useOrderDetails(id)
    const { mutate: updateOrder } = useUpdateOrder()
    if (isLoading) return <ActivityIndicator size="large" color="#ddd" />
    if (error) return <Text>error while loading orders</Text>
    if (!order) return <Text>Order not found!</Text>

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Order #${order.id}` }} />

            <FlatList
                data={order.order_items}
                // @ts-ignore
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }}
                ListHeaderComponent={() => <OrderListItem order={order} />}
                ListFooterComponent={() => (
                    <>
                        <Text style={{ color: 'white', fontSize: 20 }}>Status</Text>
                        <View style={styles.actions}>
                            <FlatList
                                horizontal
                                contentContainerStyle={{ gap: 4, marginVertical: 10 }}
                                data={OrderStatusList}
                                renderItem={({ item: status }) => (
                                    <Text
                                        style={[
                                            styles.status,
                                            status === order.status &&
                                                styles.currentStatus,
                                        ]}
                                        onPress={() =>
                                            updateOrder({ id, updatedFields: { status } })
                                        }
                                        key={status}>
                                        {status}
                                    </Text>
                                )}></FlatList>
                            {/* {OrderStatusList.map((status) => (
                                <Text
                                    style={[
                                        styles.status,
                                        status === order.status && styles.currentStatus,
                                    ]}
                                    onPress={() =>
                                        updateOrder({ id, updatedFields: { status } })
                                    }
                                    key={status}>
                                    {status}
                                </Text>
                            ))} */}
                        </View>
                    </>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        // flex: 1,
        gap: 10,
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
    },
    status: {
        padding: 10,
        backgroundColor: '#333',
        color: 'white',
        borderRadius: 10,
    },
    currentStatus: {
        backgroundColor: 'gainsboro',
        color: 'black',
    },
})
