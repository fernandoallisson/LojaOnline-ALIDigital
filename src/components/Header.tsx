import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useSubscription } from '../hooks/useSubscription'
import { Button } from './ui/Button'
import { User, LogOut } from 'lucide-react'

export function Header() {
  const { user, signOut } = useAuth()
  const { activeSubscriptionName } = useSubscription()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              <a href="/">Loja</a>
            </h1>
          </div>
          
          <nav className="flex items-center space-x-4">
            <a href="/products" className="text-gray-700 hover:text-gray-900">
              Produtos
            </a>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{user.email}</span>
                </div>
                
                {activeSubscriptionName && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {activeSubscriptionName}
                  </span>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={signOut}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <a href="/login" className="text-gray-700 hover:text-gray-900">
                  Entrar
                </a>
                <a href="/signup">
                  <Button size="sm">Cadastrar</Button>
                </a>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}