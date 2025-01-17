import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import Button from '@/src/components/Button'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import Colors from '@/src/constants/Colors'
import {
    useDeleteProduct,
    useInsertProduct,
    useProduct,
    useUpdateProduct,
} from '@/src/api/products'
import { randomUUID } from 'expo-crypto'
import { supabase } from '@/src/lib/supabase'
import { decode } from 'base64-arraybuffer'

export function CreateProductScreen() {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState<string | null>(null)
    const [issue, setIssue] = useState('')

    const { id: idString } = useLocalSearchParams()
    const id = idString
        ? parseFloat(typeof idString === 'string' ? idString : idString?.[0])
        : null
    const isUpdate = !!idString

    const { mutate: insertProduct } = useInsertProduct()
    const { mutate: updateProduct } = useUpdateProduct()
    const { mutate: deleteProduct } = useDeleteProduct()
    const { data: updatingProduct } = useProduct(id || undefined)

    const router = useRouter()

    useEffect(() => {
        if (updatingProduct) {
            setTitle(updatingProduct.name)
            setPrice(updatingProduct.price.toString())
            setImage(updatingProduct.image)
        }
    }, [updatingProduct])

    const resetForm = () => {
        setTitle('')
        setPrice('')
        setIssue('')
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        } else {
            alert('You did not select any image.')
        }
    }

    const validateForm = () => {
        setIssue('')
        if (title === '') {
            setIssue('Title is required')
            return false
        }
        if (price === '') {
            setIssue('Price is required')
            return false
        }
        if (isNaN(parseFloat(price))) {
            setIssue('Price is not a number')
            return false
        }
        return true
    }

    const postUpdateFn = {
        onSuccess: () => {
            router.back()
        },
        onError: (error: any) => Alert.alert('Error', error.message),
        onSettled: () => resetForm(),
    }

    const onsubmit = async () => {
        if (!validateForm()) return
        const imagePath = await uploadImage()
        if (isUpdate) {
            updateProduct(
                {
                    id,
                    title,
                    image: imagePath,
                    price: parseFloat(price),
                },
                postUpdateFn,
            )
        } else {
            insertProduct(
                {
                    title,
                    image: imagePath,
                    price: parseFloat(price),
                },
                postUpdateFn,
            )
        }
    }

    const confirmDelete = () => {
        Alert.alert('Confirm', 'are you sure you want to delete this item?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: onDelete },
        ])
    }
    const onDelete = () => {
        if (!id) return Alert.alert('Error', 'Invalid ID')
        deleteProduct(id, { onSuccess: () => router.replace('/(admin)') })
    }

    const uploadImage = async () => {
        if (!image?.startsWith('file://')) {
            return
        }

        const base64 = await FileSystem.readAsStringAsync(image, {
            encoding: 'base64',
        })
        const filePath = `${randomUUID()}.png`
        const contentType = 'image/png'

        const { data, error } = await supabase.storage
            .from('product-images')
            .upload(filePath, decode(base64), { contentType })

        if (error) console.warn(error)
        if (data) return data.path
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{ title: isUpdate ? 'Update Product' : 'Create Product' }}
            />
            <TouchableOpacity onPress={pickImage}>
                <Image
                    source={{ uri: image || defaultPizzaImage }}
                    style={styles.image}
                />
            </TouchableOpacity>
            {!image && (
                <Text onPress={pickImage} style={styles.textBtn}>
                    Select Image
                </Text>
            )}
            <Text style={styles.label}>Title</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                placeholder="Title"></TextInput>
            <Text style={styles.label}>Price($)</Text>
            <TextInput
                value={price}
                onChangeText={setPrice}
                style={styles.input}
                placeholder="$9.9"
                keyboardType="decimal-pad"></TextInput>
            <Text style={styles.issue}>{issue}</Text>
            <Button text={isUpdate ? 'Update' : 'Create'} onPress={onsubmit} />
            {isUpdate && (
                <Button text="Delete" onPress={confirmDelete} style={styles.delBtn} />
            )}
        </View>
    )
}

export default CreateProductScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#444',
        padding: 10,
        borderRadius: 10,
        flex: 1,
    },
    image: {
        width: '80%',
        aspectRatio: 1,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    textBtn: {
        color: Colors.light.tint,
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 24,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 10,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
    issue: {
        color: 'red',
    },
    delBtn: {
        backgroundColor: 'red',
    },
})
