import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'

import { OrderStatusList, type OrderStatus } from '@/src/types';

import orders from '@/assets/data/orders'
import OrderListItem from '@/components/OrderListItem'
import OrderItemListItem from '@/src/components/OrderItemListItem'

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams()
  const order = orders.find((o) => o.id.toString() === id)

  const changeStatus = (newStatus: OrderStatus) => {
    console.log('changeStatus', newStatus)
  }

  if (!order) {
    return <Text>Order not found!</Text>
  }


  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
        ListFooterComponent={() => (
          <>
          <Text style={{color: 'white', fontSize: 20}}>Status</Text>
          <View style={styles.actions}>
            {OrderStatusList.map((status) => (
              <Text style={[styles.status, status === order.status && styles.currentStatus]} onPress={() => changeStatus(`${status}`)} key={status}>{status}</Text>
            ))}
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
    gap: 10 
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
  }
})