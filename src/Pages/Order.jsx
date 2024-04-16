import React from 'react'
import useCart from '../hooks/useCart'
import useAuth from '../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const Order = () => {
    const {user}=useAuth()
    const token = localStorage.getItem(("access-token"))
 
    const {refetch,data: orders= []} =useQuery({
        queryKey:["orders",user?.email],
        queryFn: async () => {
            const res = await fetch(`https://sodium-cafe-mongoose.onrender.com/payments?email=${user?.email}`,{
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
             return res.json()
          },
    })

    const formatDate =(createdAt)=>{
        const createdDate= new Date(createdAt)
        return createdDate.toLocaleDateString()
    }

console.log(orders);


  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-28'>
        
        <div>
              <p className='md:text-5xl text-center text-4xl font-bold md:leading-snug leading-snug'>Track Your Order</p>
         </div>


         {/* tanble */}

          {/* table */}
        {
            (orders.length > 0) ?  <div className="overflow-x-auto mt-20 rounded-2xl">
            <table className="table ">
     {/* head */}
           <thead className='bg-Link text-white font-medium text-xl'>
       <tr>
         <th>#</th>
         <th>Date</th>
         <th>TransactionId</th>
         <th>Price</th>
         <th>Status</th>
         <th>Action</th>
       </tr>
     </thead>
     <tbody className='text-xl font-bold'>
 
         {
           orders?.map((item,idx)=>(
             <tr key={idx}>
             <td>{idx+1}</td>
             <td>
                  {formatDate(item.createdAt)}
             </td>
             <td>
              {item?.transactionId}
              
             
             </td>
             <td> {item.price} TK</td>
             <td> {item.status} </td>
             
             
             <td> 
                 <Link
                 to="/contact"
                 className='btn btn-sm bg-blue-500 hover:bg-blue-600 text-white font-bold'>Contact</Link>    
              </td>
             
            
           </tr>
           ))
         }
  
      
      
    
     </tbody>
   
     
   </table>
         </div> : ""
        }
    </div>
  )
}

export default Order