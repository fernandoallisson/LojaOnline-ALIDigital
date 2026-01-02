import React from 'react'
import { Header } from '../components/Header'
import { Button } from '../components/ui/Button'
import { Alert } from '../components/ui/Alert'
import { CheckCircle } from 'lucide-react'

export function Success() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Pagamento Realizado com Sucesso!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Obrigado pela sua compra. Você receberá um email de confirmação em breve.
          </p>

          <Alert type="success" title="Próximos passos">
            <ul className="text-left space-y-2">
              <li>• Você receberá um email de confirmação</li>
              <li>• Para assinaturas, o acesso será ativado automaticamente</li>
              <li>• Para produtos físicos, acompanhe o status do envio por email</li>
            </ul>
          </Alert>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/products">
              <Button variant="outline">Ver Mais Produtos</Button>
            </a>
            <a href="/">
              <Button>Voltar ao Início</Button>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}