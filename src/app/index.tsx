import { ActivityIndicator, View } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import { Link, Redirect } from 'expo-router'
import { useAuth } from '../providers/AuthProvider'
import { supabase } from '../lib/supabase'
import Colors from '../constants/Colors'

const index = () => {
  const { session, loading, isAdmin } = useAuth() 

  if (loading) {
    return <ActivityIndicator />
  }

  // if (!session) {
  //   return <Redirect href={'/(auth)/sign-in'} />
  // }

  if (!isAdmin) {
    return <Redirect href={'/(user)'} />
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      {!session && <Link href={'/(auth)/sign-in'} asChild>
        <Button text="Sign in" />
      </Link>}
      {session && <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>}
      {session && <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>}
      {session && <Button 
        onPress={() => supabase.auth.signOut()} 
        style={{ marginTop: 10, backgroundColor: 'transparent', borderColor: Colors.light.tint, borderWidth: 1 }}
        text="Sign out" 
      />}
    </View>
  );
};

export default index