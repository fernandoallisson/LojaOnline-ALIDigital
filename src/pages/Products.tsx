import React from 'react'
import { stripeProducts } from '../stripe-config'
import { ProductCard } from '../components/ProductCard'
import { Header } from '../components/Header'

export function Products() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Nossos Produtos
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Escolha o produto ideal para você
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stripeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}