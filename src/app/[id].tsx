import { Image, StyleSheet, Text, View } from "react-native"
import Colors from '@/src/constants/Colors'

import type { Product } from '@/src/types'
import { Link, useLocalSearchParams } from "expo-router"

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

type ProductViewProps = {
    product: Product
}

const ProductView = ({ product } : ProductViewProps) => {
  const { id } = useLocalSearchParams()
    return (
      <View style={styles.container}>
        <Text style={styles.title}>TEST {id}</Text>
        {/* <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image}/>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text> */}
      </View>
    )
  
  }

  export default ProductView

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#444',
      padding: 10,
      borderRadius: 10,
      flex: 1,
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