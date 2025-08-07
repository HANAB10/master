import React, { useState } from 'react'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import './app/globals.css'

type Page = 'login' | 'register'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login')

  const handleLogin = (userType: string, credentials: { email: string; password: string }) => {
    console.log('Login attempt:', { userType, credentials })
    // Handle login logic here
    alert(`Login attempt for ${userType}: ${credentials.email}`)
  }

  const handleRegister = (data: any) => {
    console.log('Registration attempt:', data)
    // Handle registration logic here
    alert(`Registration attempt for ${data.userType}: ${data.email}`)
  }

  const handleForgotPassword = (userType: string) => {
    console.log('Forgot password for:', userType)
    // Handle forgot password logic here
    alert(`Forgot password for ${userType}`)
  }

  const handleNavigateToRegister = () => {
    setCurrentPage('register')
  }

  const handleNavigateToLogin = () => {
    setCurrentPage('login')
  }

  return (
    <div className="App">
      {currentPage === 'login' ? (
        <LoginPage
          onLogin={handleLogin}
          onNavigateToRegister={handleNavigateToRegister}
          onForgotPassword={handleForgotPassword}
        />
      ) : (
        <RegisterPage
          onRegister={handleRegister}
          onNavigateToLogin={handleNavigateToLogin}
        />
      )}
    </div>
  )
}

export default App
