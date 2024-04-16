import React, { useContext, useState } from 'react'
import useCart from '../../hooks/useCart'
import { FaTrash } from 'react-icons/fa'
import  Swal  from 'sweetalert2';
import { AuthContext } from '../../Context/AuthProvider';
import { Link } from 'react-router-dom';

const CartPage = () => {

    const [cart,refetch]=useCart()
    const {user}=useContext(AuthContext)
  const [cartItems, setCartItems]=useState([])
    console.log("dfsdfsdfsdafsdaf",cart);

    const handleIncrease = (item) => {
    
        fetch(`http://localhost:8000/carts/${item?._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ quantity: item.quantity + 1 })
        })
        .then(res => res.json())
        .then(data => {
            const updateCart = cart.map((cartItem) => { // Use cart instead of cartItems
                
                if (cartItem.id === item.id) {
    
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity + 1
                    };
                }
                return cartItem;
            });
            setCartItems(updateCart);
          
            refetch(); // Make sure refetch is called after setCartItems
        })
        .catch(error => {
            console.error('Error updating cart:', error);
        });
       
    };

    const handleDecrease = (item) => {
        fetch(`http://localhost:8000/carts/${item?._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ quantity: item.quantity - 1 })
        })
        .then(res => res.json())
        .then(data => {
            const updateCart = cart.map((cartItem) => { // Use cart instead of cartItems
                
                if (cartItem.id === item.id) {
    
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity - 1
                    };
                }
                return cartItem;
            });
            setCartItems(updateCart);
          
            refetch(); // Make sure refetch is called after setCartItems
        })
        .catch(error => {
            console.error('Error updating cart:', error);
        });
    };
    

    const handleDelete =(item)=>{
        Swal.fire({
            title: "Confirm?",
            text: "Delete this?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              fetch(`http://localhost:8000/carts/${item?._id}`,{
                method: 'DELETE'
              })
              .then(res=>res.json())
              .then(data=>{
                console.log(data);
               if(data.deletedCount> 0){
                
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted",
                    icon: "success"
                })
               }
               refetch()
            })
            }
          });
    }

   
   


    const calcualatePrice =(item)=>{
       return item.price * item.quantity
    }

    const calculateTotalPrice = cart.reduce((total,item)=>{
        return total+calcualatePrice(item)
    },0)

    const orderTotal = calculateTotalPrice


  return (
    <div className='section-container my-28'>
         <div>
              <p className='md:text-5xl text-center text-4xl font-bold md:leading-snug leading-snug'>Cheake Your Order Here & Confirm Your Payment</p>
         </div>

        
         {/* table */}
         <div className="overflow-x-auto mt-20 rounded-2xl">
           <table className="table ">
    {/* head */}
          <thead className='bg-button text-white font-medium text-xl'>
      <tr>
        <th>#</th>
        <th>Food</th>
        <th>Item Name</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody className='text-xl font-bold'>

        {
          cart?.map((item,idx)=>(
            <tr key={idx}>
            <td>{idx+1}</td>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={item?.image} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                
              </div>
            </td>
            <td>
             {item?.name}
             
            
            </td>
            <td>
            <button className='btn btn-xs text-xl text-center' 
            onClick={()=>handleDecrease(item)}
            >-</button>
                <input
                onChange={()=>console.log(item.quantity)}
                type="number" value={item.quantity} className='w-10 mx-2 text-center overflow-hidden appearance-none'/>
           
                <button
                 
                className='btn btn-xs text-xl'
                onClick={()=>handleIncrease(item)}
                >+</button>
                </td>
            <td>{calcualatePrice(item).toFixed(2)} taka</td>
            <th>
              <button
              onClick={()=>handleDelete(item)}
              className="btn btn-ghost btn-xs"><FaTrash className='text-xl font-bold text-red-500'/></button>
            </th>
          </tr>
          ))
        }
 
     
     
   
    </tbody>
  
    
  </table>
        </div>

         


        {/* customer details page */}
        <div className='my-20'>
         <h3 className='font-bold text-center text-3xl text-button mb-8'>Customer Details</h3>
             
         
               <div className='flex flex-wrap justify-between'>
                    
                    <div>
                    <p className='text-2xl font-bold mb-3 ml-6 text-center'>User Information</p>
                    <div className=' space-y-3 border-2 md:w-[500px] text-start p-10 bg-[#f5aebd] shadow-2xl rounded-2xl'>
                       <p className='text-xl font-medium'>Name: <span className='font-bold text-2xl ' >{user.displayName}</span></p>
                       <p className='text-xl font-medium'>Email: <span className='font-bold text-2xl'>{user.email}</span></p>
                      <p className='text-xl font-medium'>User_id: <span className='text-xl font-bold'>{user.uid}</span></p>
                    </div>
                    </div>
                    {/* second cart */}
                   
                  <div>
                  <p className='text-2xl font-bold mb-3 ml-6 text-center'>Order Summary</p>
                  <div className=' space-y-3 h-48  border-2 text-start md:w-[500px] p-10 bg-[#f5aebd] shadow-2xl rounded-2xl'>
                    
                       <p className='text-xl font-medium'>Order Items: <span className='font-bold text-2xl ' >{cart.length}</span></p>
                       <p className='text-xl font-medium'>Total Price: <span className='font-bold text-2xl'>{orderTotal.toFixed(2)} Taka</span></p>
                   
                    </div>
                  </div>
               </div>
        </div>
        <div className='text-center md:text-end mt-12'>
<Link to='/process-chekout'>
<button className='px-8 py-6 font-bold text-white text-xl rounded-2xl bg-button hover:bg-button-hvr'>Procced Cheakout</button>
</Link>
</div>

       
    </div>
  )
}

export default CartPage