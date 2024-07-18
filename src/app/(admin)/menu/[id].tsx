import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'

import Colors from '@/src/constants/Colors'
import { useProduct } from '@/src/api/products'
import { FontAwesome } from '@expo/vector-icons'

export const defaultPizzaImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

const ProductView = () => {
    const { id: idString } = useLocalSearchParams()
    const id = idString
        ? parseFloat(typeof idString === 'string' ? idString : idString?.[0])
        : null
    const { data: product, error, isLoading } = useProduct(id ?? 0)

    if (!id) return <Text style={{ color: 'red' }}>Missing product ID</Text>
    if (isLoading) return <ActivityIndicator size="large" color="#ddd" />
    if (error) return <Text style={{ color: 'red' }}>error while loading products</Text>

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'product',
                    headerRight: () => (
                        <Link href={`/(admin)/menu/create?id=${product.id}`} asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="pencil-square-o"
                                        size={25}
                                        color={Colors.light.tint}
                                        style={{
                                            marginRight: 15,
                                            opacity: pressed ? 0.5 : 1,
                                        }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <Stack.Screen options={{ title: product.name }} />
            <Image
                source={{ uri: product.image || defaultPizzaImage }}
                style={styles.image}
            />
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
    },
})
