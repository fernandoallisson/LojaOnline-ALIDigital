import React, { useState } from 'react'
import { StripeProduct } from '../stripe-config'
import { Button } from './ui/Button'
import { supabase } from '../lib/supabase'

interface ProductCardProps {
  product: StripeProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(false)

  const handlePurchase = async () => {
    setLoading(true)
    
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        window.location.href = '/login'
        return
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          price_id: product.priceId,
          mode: product.mode,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/products`
        })
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency
    }).format(price)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
      {product.description && (
        <p className="text-gray-600 mb-4">{product.description}</p>
      )}
      <div className="mb-4">
        <span className="text-2xl font-bold text-gray-900">
          {formatPrice(product.price, product.currency)}
        </span>
        {product.mode === 'subscription' && (
          <span className="text-gray-600 ml-1">/mês</span>
        )}
      </div>
      <Button 
        onClick={handlePurchase}
        loading={loading}
        className="w-full"
      >
        {product.mode === 'subscription' ? 'Assinar' : 'Comprar'}
      </Button>
    </div>
  )
}