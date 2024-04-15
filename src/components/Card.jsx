/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
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
         fetch("http://localhost:8000/carts",{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(cartItems)
         })
         .then(res=>res.json())
         .then(data=>{
            console.log(data.message);
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

        <div className="card w-96 bg-base-100 shadow-xl ">

            
            <Link to={`/menu/${res._id}`}>
            <figure><img src={res.image} alt="Shoes" className='w-full object-cover rounded-3xl
            hover:scale-105 transition-all duration-200 md:h-72
            ' /></figure>
            </Link>
            <div className="card-body">

                <div className='-mt-6'>  <h2 className="card-title font-bold text-2xl">{res.name}

                </h2>
                    <div className='flex justify-between mt-4 mb-2 items-center'>
                        <div className="badge badge-secondary ">{res.category}</div>
                        <div>
                        <div className={`rating gap-1 text-2xl  ml-12 w-12  h-12 top-2 heartStar text-red ${isHeartFilled ? "text-rose-500": "text-red"}`}
            onClick={handleHeartClick}
            >
                <FaHeart className='h-5 w-5 cursor-pointer items-center text-center ml-3'/>
            </div>
                            
                            </div>
                    </div>
                    <p className='font-bold text-xl text-gray-600 '>{res.price} taka</p>
                </div>


                <p>{res.recipe.length > 81 ? res.recipe.slice(0, 81) + '...' : res.recipe}</p>

                <div className="card-actions ">
                    <button
                    onClick={()=>handleAddToCart(res)}
                    className="mt-6 btn
                      rounded-full px-8 flex text-center text-white font-bold
                        bg-button hover:bg-button-hvr"><FaShoppingCart /> Buy Now </button>
                </div>
            </div>
        </div>

    );
};

export default Card;