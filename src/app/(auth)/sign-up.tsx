import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

import Button from '@/src/components/Button'
import { Link, Stack } from 'expo-router'
import Colors from '@/src/constants/Colors'


export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [issue, setIssue] = useState('')

  const validate = () => {
    setIssue('')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (password !== confirmPassword) {
      setIssue('Passwords do not match')
      return false
    }
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
      <Stack.Screen options={{ title: 'Sign up' }} />
        <Text style={styles.text}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder='John@gmail.com' textContentType='emailAddress'></TextInput>
        <Text style={styles.text}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder='●●●●●●' placeholderTextColor={'#ddd'} textContentType='password' secureTextEntry={true}></TextInput>
        <Text style={styles.text}>Confirm Password</Text>
        <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} placeholder='●●●●●●' placeholderTextColor={'#ddd'} textContentType='password' secureTextEntry={true}></TextInput>
        {issue && <Text style={styles.issueText}>{issue}</Text>}
        <Button text="Sign up" onPress={handleSubmit} />
        <Link href={'/(auth)/sign-in'} asChild>
            <Button text="Sign in" style={styles.switchBtn} />
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
        color: '#ddd',
        fontSize: 16,
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