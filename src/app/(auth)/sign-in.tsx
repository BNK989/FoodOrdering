import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'

import Button from '@/src/components/Button'
import { Link, Stack } from 'expo-router'
import Colors from '@/src/constants/Colors'
import { supabase } from '@/src/lib/supabase'
import { useAuth } from '@/src/providers/AuthProvider'


export default function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [issue, setIssue] = useState('')
    const [loading, setLoading] = useState(false)

    async function signInWithEmail() {
      if(!validate()) return
      setLoading(true)
      const {data, error} = await supabase.auth.signInWithPassword({
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

  const { session } = useAuth()
  if(session){
    return (
      <View style={styles.container}>
         <Stack.Screen options={{ title: 'Sign out' }} />
    <Button 
    onPress={() => supabase.auth.signOut()} 
    style={{ marginTop: 10, backgroundColor: 'transparent', borderColor: Colors.light.tint, borderWidth: 1 }}
    text="Sign out" 
  />
  <Link href={'/'} asChild>
    <Button text="Back home" style={styles.switchBtn} />
  </Link>
  </View>
  )
  }


  return (
    <View style={styles.container}>
        <Stack.Screen options={{ title: 'Sign in' }} />
        <Text style={styles.text}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder='John@gmail.com' textContentType='emailAddress'></TextInput>
        <Text style={styles.text}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder='●●●●●●' placeholderTextColor={'#ddd'} textContentType='password' secureTextEntry={true}></TextInput>
        {issue && <Text style={styles.issueText}>{issue}</Text>}
        <Button onPress={signInWithEmail} text={loading ? 'Loading...' : 'Sign in'} disabled={loading} style={styles.switchBtn} />
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