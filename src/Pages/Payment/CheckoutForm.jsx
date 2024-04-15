/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

import React, { useEffect, useState } from 'react'
import { FaPaypal } from 'react-icons/fa';
import useAuth from './../../hooks/useAuth';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({price,cart}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError]=useState('')
    const [clientSecret, setClientSecret] = useState("");
    const {user}=useAuth()
    const [cardError,setCardError]=useState('')
    const axiosSecure =useAxiosSecure()
    const navigate =useNavigate()


       useEffect(()=>{
        if(price >0){
          axiosSecure.post('/create-payment-intent',{price})
        .then(res =>{
            setClientSecret(res.data.clientSecret)
        })
        }
          
       },[price,axiosSecure])

       const handleSubmit =async(e)=>{
        e.preventDefault()
       
        if(!stripe || !elements){
         return
        }
       const card = elements.getElement(CardElement)

       if(card ===null){
         return
       }


       const {error, paymentMethod} = await stripe.createPaymentMethod({
         type: 'card',
         card
       });
   
       if (error) {
         console.log('Payment error', error);
         setError(error.message)
       } else {
         console.log('Payment Method', paymentMethod);
         setError('')
       }


     //   confirm payment

     const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
         payment_method: {
             card: card,
             billing_details: {
                 email: user?.email || 'anonymous',
                 name: user?.displayName || 'anonymous'
             }
         }
     })
     if (confirmError) {
         console.log('confirm error')
     }
    
     else {
         if(paymentIntent.status === 'succeeded'){


             // now save payment histroty in database
             const paymentInformation= {
                 email: user.email,
                 price: price,
                 quantity: cart.length,
                 transactionId: paymentIntent.id,
                 date: new Date(), //utc date convert. use moment js 
                 cartIds: cart.map(item=>item._id),
                
                 menuItemIds: cart.map(item=>item.menuItemId),
                
                 itemName: cart.map(item=>item.name),

                 status: 'pending'
             
             }
             console.log(paymentInformation);
              axiosSecure.post('/payments',paymentInformation)
              .then(res=>{
                alert("Payment Success!")
                navigate('/order')
              })
         

           

            
         }
       }
 };





  return (
    <div className='flex flex-col sm:flex-row justify-start items-start gap-10'>
        {/* left side */}
        <div className='md:w-1/2 w-full space-y-3'>
              
               
                  <p className='text-2xl font-bold mb-3  text-center'>Order Summary</p>
                  <div className=' space-y-3 h-48  border-2 text-start md:w-[500px] p-10 bg-[#f5aebd] shadow-2xl rounded-2xl'>
                    
                       <p className='text-xl font-medium'>Order Items: <span className='font-bold text-2xl ' >{cart.length}</span></p>
                       <p className='text-xl font-medium'>Total Price: <span className='font-bold text-2xl'>{price} Taka</span></p>
                   
                    </div>
                 
        </div>
        {/* right side */}
      
     
        <div className='md:w-1/3 space-y-6 card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 px-4 py-8 mt-12'>
        <p className='text-2xl font-bold mb-3  text-center'>Process Your Payment</p>
        {/* stripe paymernt from */}
        <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button type="submit" disabled={!stripe}
        className='text-xl  w-full font-bold text-white px-10 bg-button hover:bg-button-hvr rounded-lg py-2 mt-8 mb-8'
        >
          Pay
        </button>
        <hr />
      </form>
         {
            cardError? <p className='text-red-600'>{cardError}</p> : ""
         }
      <div className='flex  justify-center'>
      <button type="submit" disabled={!stripe}
        className='text-xl  font-bold text-white px-10 bg-blue-500 hover:bg-blue-600 rounded-lg mt-8 mb-8 flex text-center items-center py-2 w-3/4'
    >
         <FaPaypal/> Pay with Paypal
        </button>
      </div>
        </div>
       
    </div>
  )
}

export default CheckoutForm