import { createContext, useContext, useState, useEffect } from "react";

import api from '../axiosCalls/axios'


const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // runs once when the app first loads, to check "is there already a valid login cookie?"
    useEffect(() => {
        api.get('/user/me')
            .then(res => setUser(res.data.userData))
            .catch(() => setUser(null))
            .finally(() => setLoading(false))
    }, [])

    const login = async (username, password) => {
        const res = await api.post('/user/login', { username, password })
        setUser(res.data.user)
    }

    const register = async (name, email, username, password) => {
        const res = await api.post('/user/register', { name, email, username, password })
        setUser(res.data.user)
    }

    const logout = async () => {
        await api.post('/user/logout')
        setUser(null)
    }




    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )


}

export function useAuth() {
    return useContext(AuthContext)
}