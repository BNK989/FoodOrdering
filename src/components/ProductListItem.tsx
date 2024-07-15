import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import Colors from '@/src/constants/Colors'

import type { Product } from '@/src/types'
import { Link, useSegments } from "expo-router"

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

type ProductListItemProps = {
    product: Product
}

const ProductListItem = ({ product } : ProductListItemProps) => {

  const segments = useSegments()

    return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image}/>
        {/* <Image src={product.image} style={styles.image}/> */}
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
    )
  
  }

  export default ProductListItem

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#444',
      padding: 10,
      borderRadius: 10,
      flex: 1,
      maxWidth: '50%',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      marginVertical: 10,
    },
    price: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.light.tint,
    },
    image: {
      width: '100%',
      aspectRatio: 1,
      resizeMode: 'contain',
    }
  });