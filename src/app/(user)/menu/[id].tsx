import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Colors from '@/src/constants/Colors'
import Button from '@/src/components/Button'

import type { PizzaSize, Product } from '@/src/types'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { useCart } from '@/src/providers/CartProvider'
import { useProduct } from '@/src/api/products'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

export const defaultPizzaImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

type ProductViewProps = {
    product: Product
}

const ProductView = () => {
    const { id: idString } = useLocalSearchParams()
    const id = idString
        ? parseFloat(typeof idString === 'string' ? idString : idString?.[0])
        : null
    const { addItem } = useCart()
    const router = useRouter()
    const { data: product, error, isLoading } = useProduct(id ?? 0)
    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')

    if (!id) return <Text style={{ color: 'red' }}>Missing product ID</Text>
    if (isLoading) return <ActivityIndicator size="large" color="#ddd" />
    if (error) return <Text style={{ color: 'red' }}>error while loading products</Text>

    const addToCart = () => {
        if (!product) return
        addItem(product, selectedSize)
        router.push('/cart')
    }

    if (!product) {
        return <Text>Product not found</Text>
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: product.name }} />
            <Image
                source={{ uri: product.image || defaultPizzaImage }}
                style={styles.image}
            />
            <View style={styles.sizes}>
                {sizes.map((s) => (
                    <Pressable
                        onPress={() => setSelectedSize(s)}
                        style={[
                            styles.sizeContainer,
                            {
                                backgroundColor:
                                    selectedSize === s ? 'gainsboro' : 'gray',
                            },
                        ]}
                        key={s}>
                        <Text style={styles.sizeText}>{s}</Text>
                    </Pressable>
                ))}
            </View>
            <Text style={styles.price}>${product.price}</Text>
            <Button onPress={addToCart} text="Add to cart" />
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
        marginTop: 'auto',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    sizes: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
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
    },
})
