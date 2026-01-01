import * as React from 'react'
import { tuyau } from './tuyau'
import { sleep } from './utils'

interface Profile {
  fullName: string
}

interface User {
  id: string
  email: string
  profile?: Profile
}

export interface AuthContext {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, fullName: string, password: string) => Promise<void>
  logout: () => Promise<void>
  user: User | null
}

const AuthContext = React.createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const token = localStorage.getItem('auth-token')
    console.log('Token trouvé au démarrage:', token)
    if (!token) {
      return setIsLoading(false)
    }

    fetch('http://localhost:3333/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          console.warn('Token invalide ou expiré')
          localStorage.removeItem('auth-token')
          setIsAuthenticated(false)
          setUser(null)
        } else {
          const data = await res.json()
          console.log('Réponse de /me:', data)
          if (data?.user) {
            setUser(data.user)
            setIsAuthenticated(true)
          }
        }
      })
      .catch((err) => {
        console.error('Erreur pendant la vérification /me:', err)
        localStorage.removeItem('auth-token')
        setIsAuthenticated(false)
      })
      .finally(() => setIsLoading(false)) // ✅ important !
  }, [])

  const login = React.useCallback(async (email: string, password: string) => {
    await sleep(500)
    try {
      const { data } = await tuyau.login.$post({ email, password })
      if (!data) throw new Error('Authentication failed')
      // @ts-ignore
      setUser(data.user)
      setIsAuthenticated(true)
      localStorage.setItem('auth-token', data.token)
      console.log('Login réussi:', data)
    } catch (err) {
      console.error('Authentication failed', err)
      throw new Error('Authentication failed')
    }
  }, [])

  const register = React.useCallback(
    async (email: string, fullName: string, password: string) => {
      await sleep(500)
      try {
        const { data } = await tuyau.register.$post({
          email,
          fullName,
          password,
        })
        if (!data) throw new Error('Authentication failed')
        setIsAuthenticated(true)
        if (!data?.token) {
          throw new Error('No token returned')
        }
        localStorage.setItem('auth-token', data.token)
        console.log('Login réussi:', data)
      } catch (err) {
        console.error('Registration failed', err)
        throw new Error('Registration failed')
      }
    },
    [],
  )

  const logout = React.useCallback(async () => {
    await sleep(250)
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('auth-token')
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
