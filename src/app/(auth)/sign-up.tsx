import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'

import Button from '@/src/components/Button'
import { Link, Stack } from 'expo-router'
import Colors from '@/src/constants/Colors'
import { supabase } from '@/src/lib/supabase'


export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [issue, setIssue] = useState('')
  const [loading, setLoading] = useState(false)

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
  
  async function signUpWithEmail() {
    if(!validate()) return
    setLoading(true)
    const {data, error} = await supabase.auth.signUp({
      email,
      password,
    })
    
    if (error) {
      setIssue(error.message)
      Alert.alert(error.message)
    }
    if (data) {
      console.warn('signUp Okay,', data)
    }
    setLoading(false)
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
        <Button text={loading ? 'Loading...' : 'Sign up'} disabled={loading} onPress={signUpWithEmail} />
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