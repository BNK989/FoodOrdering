import { View, Text, Platform, StyleSheet, FlatList} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useCart } from '@/src/providers/CartProvider'

import EditScreenInfo from '@/src/components/EditScreenInfo';
import CartListItem from '../components/CartListItem'

export default function CartScreen() {
  const { items } = useCart()

  return (
    <View>
      <FlatList style={styles.container} data={items} renderItem={({ item }) => <CartListItem cartItem={item} key={item.id}/>}/>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
