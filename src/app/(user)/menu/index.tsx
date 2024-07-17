import Colors from '@/src/constants/Colors'
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native'
// import products from '@/assets/data/products'
import ProductListItem from '@/src/components/ProductListItem'
import { useProductList } from '@/src/api/products'




export default function MenuScreen() {

  const { data: products, error, isLoading } = useProductList()

  if(isLoading) return <ActivityIndicator size="small" color="#0000ff" />
  if(error) return <Text> error while loading products</Text>


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