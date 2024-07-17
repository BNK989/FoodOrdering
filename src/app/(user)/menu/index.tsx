import Colors from '@/src/constants/Colors'
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native'
import ProductListItem from '@/src/components/ProductListItem'
import { useProductList } from '@/src/api/products'

export default function MenuScreen() {

  const { data: products, error, isLoading } = useProductList()

  if(isLoading) return <ActivityIndicator size="large" color="#ddd" />
  if(error) return <Text style={{color: 'red'}}> error while loading products</Text>

  return (
      <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} key={item.id}/>}
      numColumns={2}
      contentContainerStyle={{gap: 10, padding: 10}}
      columnWrapperStyle={{gap: 10}}
      />
  )
}


// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     gap: 10,

//   },
// });