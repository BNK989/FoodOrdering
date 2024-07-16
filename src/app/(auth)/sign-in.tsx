import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

import Button from '@/src/components/Button'
import { Link, Stack } from 'expo-router'
import Colors from '@/src/constants/Colors'


export default function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [issue, setIssue] = useState('')

    const validate = () => {
        setIssue('')
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(password.length < 6) {
          setIssue('Password must be at least 6 characters')
          return false
        }
        if(!emailRegex.test(email)) {
          setIssue('Email is not valid')
          return false
        }
        return true
      }

    const handleSubmit = () => {
    if(!validate()) return
        console.warn(email, password)
    }


  return (
    <View style={styles.container}>
        <Stack.Screen options={{ title: 'Sign in' }} />
        <Text style={styles.text}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder='John@gmail.com' textContentType='emailAddress'></TextInput>
        <Text style={styles.text}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder='●●●●●●' placeholderTextColor={'#ddd'} textContentType='password' secureTextEntry={true}></TextInput>
        {issue && <Text style={styles.issueText}>{issue}</Text>}
        <Button onPress={handleSubmit} text="Sign in" />
        <Link href={'/(auth)/sign-up'} asChild>
            <Button text="Create an account" style={styles.switchBtn} />
        </Link>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#333',
      padding: 10,
      borderRadius: 10,
      gap: 10,
      flex: 1,
    },
    text: {
        color: 'white',
        fontSize: 18,
    },
    input: {
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 10,
    },
    switchBtn: {
        backgroundColor: 'transparent',
        borderColor: Colors.light.tint,
        borderWidth: 1,
    },
    issueText: {
        color: 'red',
        fontSize: 18
    }
})