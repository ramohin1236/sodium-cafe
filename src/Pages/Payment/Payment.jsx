import { Elements } from '@stripe/react-stripe-js'
import React from 'react'
import CheckoutForm from './CheckoutForm'
import { loadStripe } from '@stripe/stripe-js';
import useCart from '../../hooks/useCart';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_API_PK);



const Payment = () => {
  
    const [cart]=useCart()
   const cartTotal = cart.reduce((sum,item)=>sum + (item.price*item.quantity), 0)
   
   const totalPrice = parseFloat(cartTotal).toFixed(2)

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4  my-28'>
      <Elements stripe={stripePromise}>
          <CheckoutForm
          price={totalPrice}
          cart={cart}/>   
      </Elements>
    </div>
  )
}

export default Payment