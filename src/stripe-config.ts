export interface StripeProduct {
  id: string
  priceId: string
  name: string
  description?: string
  price: number
  currency: string
  mode: 'payment' | 'subscription'
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_ThWh0L8fhmfjoK',
    priceId: 'price_1Sk7eQGxPbiyOnFJzSWOBT1p',
    name: 'Plano de internet',
    price: 50.00,
    currency: 'BRL',
    mode: 'subscription'
  },
  {
    id: 'prod_ThWhxrWUp3kQl0',
    priceId: 'price_1Sk7e0GxPbiyOnFJW19gRUMX',
    name: 'iPhone 15',
    description: 'Celular',
    price: 4000.00,
    currency: 'BRL',
    mode: 'payment'
  }
]

export const getProductByPriceId = (priceId: string) => {
  return stripeProducts.find(product => product.priceId === priceId)
}