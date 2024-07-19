import OrderListItem from '@/components/OrderListItem'
import { useUserOrderList } from '@/src/api/orders'
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native'

export default function OrdersScreen() {
    const { data: orders, error, isLoading, refetch, isRefetching } = useUserOrderList()

    if (isLoading) return <ActivityIndicator size="large" color="#ddd" />
    if (error) return <Text>error while loading orders</Text>

    return (
        <View style={styles.container}>
            {isRefetching && <ActivityIndicator size="large" color="#ddd" />}
            <FlatList
                style={styles.list}
                data={orders}
                contentContainerStyle={{ gap: 10, padding: 10 }}
                renderItem={({ item }) => <OrderListItem order={item} />}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={refetch} />
                }
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
