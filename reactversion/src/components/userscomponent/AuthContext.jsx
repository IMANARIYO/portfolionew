import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// AuthContext.js

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'https://myportfolioapi-8vku.onrender.com/auth/login',
        { email, password }
      )
      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.access_token)
        localStorage.setItem('userId', response.data.user._id)
        setIsAuthenticated(true)
        if (response.data.user.role === 'admin') {
          navigate('/dashboard')
        } else {
          navigate('/')
        }
      }
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userId')
    setIsAuthenticated(false)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
