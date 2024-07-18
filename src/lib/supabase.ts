import 'react-native-url-polyfill/auto'
import * as SecureStore from 'expo-secure-store'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/src/database.types'

// To refresh data run: pnpx supabase gen types typescript --project-id hpyqjlkkfhlsgkaxhvrv > src/databases.types.ts

const ExpoSecureStoreAdapter = {
    getItem: async (key: string) => {
        try {
            return await SecureStore.getItemAsync(key)
        } catch (error) {
            console.error('Error getting item from SecureStore:', error)
        }
    },
    setItem: async (key: string, value: string) => {
        try {
            await SecureStore.setItemAsync(key, value)
        } catch (error) {
            console.error('Error setting item in SecureStore:', error)
        }
    },
    removeItem: async (key: string) => {
        try {
            await SecureStore.deleteItemAsync(key)
        } catch (error) {
            console.error('Error removing item from SecureStore:', error)
        }
    },
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON || ''

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: ExpoSecureStoreAdapter as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})
