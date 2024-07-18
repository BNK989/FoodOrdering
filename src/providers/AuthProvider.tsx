import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Session } from '@supabase/supabase-js'

type AuthData = {
    session: Session | null
    profile: Profile | null
    loading: boolean
    isAdmin?: boolean
}

type Profile = {
    group: 'ADMIN' | 'USER'
}

const AuthContext = createContext<AuthData>({
    session: null,
    profile: null,
    loading: true,
    isAdmin: false,
})

export default function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)
    const [count, SetCount] = useState(0)

    const fetchSession = async () => {
        const {
            data: { session },
            error,
        } = await supabase.auth.getSession()
        if (error) {
            console.error('error at sign in', error)
        }
        setSession(session)

        if (session) {
            // fetch profile
            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single()
            setProfile(data || null)
        } else {
            console.log('no session')
        }

        setLoading(false)
    }

    useEffect(() => {
        SetCount(count + 1)

        fetchSession()
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <AuthContext.Provider
            value={{ session, loading, profile, isAdmin: profile?.group === 'ADMIN' }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
