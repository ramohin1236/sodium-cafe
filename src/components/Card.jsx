/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthProvider';
import Swal from 'sweetalert2'
import { useNavigate, useLocation } from 'react-router-dom';
import useCart from '../hooks/useCart';

const Card = ({ res }) => {
   const {name,image,price,recipe,_id}=res;
   const [cart,refetch]=useCart()
    const navigate =useNavigate()
    const location= useLocation()
    const [isHeartFilled, setIsHeartFilled]=useState(false)
    const {user}=useContext(AuthContext)

    const handleHeartClick=()=>{
        setIsHeartFilled(!isHeartFilled)
    }

    const handleAddToCart=(res)=>{
        if(user && user?.email){
          const cartItems={
            menuItemId: _id,
            name,
            quantity: 1,
            image,
            price,
            email:user.email,
          }
         fetch("https://sodium-cafe-mongoose.onrender.com/carts",{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(cartItems)
         })
         .then(res=>res.json())
         .then(data=>{
            if(data){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${name} added Successfully!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            if(data.message){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `${name} Already added!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
        }else{
            Swal.fire({
                title: "Please Login!",
                text: "Without an account can't able to add products!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Signup"
              }).then((result) => {
                if (result.isConfirmed) {
                 navigate('/signup',{state:{from:location}});
                }
              });
        }
    }

 return (
        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            {/* Image Container */}
            <div className="relative h-72 overflow-hidden">
                <img 
                    src={image} 
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                
                {/* Floating Category Badge */}
                <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-lg">
                        {res.category}
                    </span>
                </div>

                {/* Floating Action Buttons */}
                <div className="absolute right-4 top-4 flex flex-col gap-2">
                    <button 
                        onClick={handleHeartClick}
                        className={`rounded-full bg-white/90 p-2 shadow-lg transition-all duration-300 hover:bg-red-500 hover:text-white ${isHeartFilled ? 'bg-red-500 text-white' : 'text-red-500'}`}
                    >
                        <FaHeart className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => handleAddToCart(res)}
                        className="rounded-full bg-white/90 p-2 shadow-lg transition-all duration-300 hover:bg-red-500 hover:text-white text-red-500"
                    >
                        <FaShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-red-500 transition-colors duration-300">
                    {name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                    {recipe}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-500">
                        ${price}
                    </span>
                    <button 
                        onClick={() => handleAddToCart(res)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-all duration-300"
                    >
                        <FaShoppingCart className="w-5 h-5" />
                        Add to Cart
                    </button>
                </div>
            </div>

           
        </div>
    );
};

export default Card;