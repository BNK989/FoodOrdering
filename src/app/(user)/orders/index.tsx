import orders from '@/assets/data/orders'
import OrderListItem from '@/components/OrderListItem'
import { Stack } from 'expo-router'
import { FlatList, StyleSheet, View } from 'react-native'

export default function OrdersScreen() {

  // {/* <Stack.Screen options={{ title: 'Orders' }} /> */}
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
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