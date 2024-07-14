import { View, Text, Platform, StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useCart } from '@/src/providers/CartProvider'

import EditScreenInfo from '@/src/components/EditScreenInfo';

export default function CartScreen() {
  const { items } = useCart()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart Items: {items.length}</Text>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
