import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'

import Button from '@/src/components/Button'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import Colors from '@/src/constants/Colors'
import products from "@/assets/data/products"
import { Product } from '@/src/types'


export function CreateProductScreen() {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [issue, setIssue] = useState('')

  const { id } = useLocalSearchParams()
  const isUpdate = !!id

  const product = products.find(p => p.id === +id!) as Product

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
    if(title === '') {
      setIssue('Title is required')
      return false
    }
    if(price === '') {
      setIssue('Price is required')
      return false
    }
    if(isNaN(parseFloat(price))) {
      setIssue('Price is not a number')
      return false
    }
    return true
  }

  const onsubmit = () => {
    isUpdate ? updateItem() : createItem()
  }

  const updateItem = () => {
    if(!validateForm()) return
      console.warn(title, price, issue)
      resetForm()
  }

  const createItem = () => {
    if(!validateForm()) return
      console.warn(title, price, issue)
      resetForm()
  }
  const confirmDelete = () => {
      Alert.alert("Confirm", "are you sure you want to delete this item?", [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: onDelete },
      ])
  }
  const onDelete = () => {
      console.warn('deleting...')    
  }


  return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: isUpdate ? 'Update Product' : 'Create Product' }} />
        <TouchableOpacity onPress={pickImage}> 
          <Image source={{ uri: image || defaultPizzaImage}} style={styles.image} />
        </TouchableOpacity>
        {!image &&<Text onPress={pickImage} style={styles.textBtn}>Select Image</Text>}
        <Text style={styles.label}>Title</Text>
        <TextInput value={title} onChangeText={setTitle} style={styles.input} placeholder='Title'></TextInput>
        <Text style={styles.label}>Price($)</Text>
        <TextInput value={price} onChangeText={setPrice} style={styles.input} placeholder='$9.9' keyboardType='decimal-pad'></TextInput>
        <Text style={styles.issue}>{ issue }</Text>
        <Button text={ isUpdate ? "Update" : "Create"} onPress={onsubmit}	/>
        {isUpdate &&<Button text="Delete"	onPress={confirmDelete} style={styles.delBtn}	/>}
        
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
    }
   
  });