import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import Colors from '@/src/constants/Colors'
import products from "@/assets/data/products"
import Button from "@/src/components/Button"

import type { PizzaSize, Product } from '@/src/types'
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router"
import { useState } from "react"
import { useCart } from '@/src/providers/CartProvider'
import { FontAwesome } from "@expo/vector-icons"

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

type ProductViewProps = {
    product: Product
}

const ProductView = () => {
  const { id } = useLocalSearchParams()
  const { addItem } = useCart()

  const router = useRouter()

  const product = products.find(p => p.id === +id!) as Product

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')

  const addToCart = () => {
    if(!product) return
    addItem(product, selectedSize)
    router.push('/cart')

  }

  if(!product) {
    return (
      <Text>Product not found</Text>
    )
  }
    return (
      
      <View style={styles.container}>
        <Stack.Screen options={{ 
          title: 'product', 
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${product.id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil-square-o"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
      ) }} />
        <Stack.Screen options={{ title: product.name }} />
        <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image}/>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
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
      color: 'white',
    },
    image: {
      width: '100%',
      aspectRatio: 1,
      resizeMode: 'contain',
    },
    sizeContainer: {
      backgroundColor: 'gray',
      width: 40,
      aspectRatio: 1,
      borderRadius: 99,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    sizeText: {
      fontSize: 20,
      fontWeight: 'bold',
    }
  });