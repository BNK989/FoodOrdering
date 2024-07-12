import Colors from '@/src/constants/Colors'
import { StyleSheet, View } from 'react-native'
import products from '@/assets/data/products'
import ProductListItem from '@/src/components/ProductListItem'


export default function MenuScreen() {
  return (
    <View style={styles.container}>
      {products.map(p => <ProductListItem product={p} key={p.id}/>)}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 10,

  },
});