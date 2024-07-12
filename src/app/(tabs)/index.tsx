import Colors from '@/src/constants/Colors'
import { FlatList, StyleSheet } from 'react-native'
import products from '@/assets/data/products'
import ProductListItem from '@/src/components/ProductListItem'


export default function MenuScreen() {
  return (
      <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} key={item.id}/>}
      numColumns={2}
      contentContainerStyle={{gap: 10, padding: 10}}
      columnWrapperStyle={{gap: 10}}
      />
  );
}


// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     gap: 10,

//   },
// });