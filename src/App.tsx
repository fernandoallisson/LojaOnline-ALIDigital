import React from 'react'
import { useAuth } from './hooks/useAuth'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Products } from './pages/Products'
import { Success } from './pages/Success'

function App() {
  const { loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Simple routing based on pathname
  const path = window.location.pathname

  switch (path) {
    case '/login':
      return <Login />
    case '/signup':
      return <Signup />
    case '/products':
      return <Products />
    case '/success':
      return <Success />
    default:
      return <Home />
  }
}

export default App