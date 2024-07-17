import Colors from '@/src/constants/Colors'
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native'
// import products from '@/assets/data/products'
import ProductListItem from '@/src/components/ProductListItem'
import { useEffect } from 'react'
import { supabase } from '@/src/lib/supabase'
import { useQuery } from '@tanstack/react-query'



export default function MenuScreen() {

  const { data: products, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const {data, error} = await supabase.from('products').select('*')
      if(error) throw new Error(error.message)
      return data
    }
  })

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