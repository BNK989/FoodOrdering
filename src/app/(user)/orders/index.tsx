import OrderListItem from '@/components/OrderListItem'
import { useUserOrderList } from '@/src/api/orders'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'

export default function OrdersScreen() {
    const { data: orders, error, isLoading } = useUserOrderList()
    if (isLoading) return <ActivityIndicator size="large" color="#ddd" />
    if (error) return <Text>error while loading orders</Text>

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={orders}
                contentContainerStyle={{ gap: 10, padding: 10 }}
                renderItem={({ item }) => <OrderListItem order={item} />}
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
