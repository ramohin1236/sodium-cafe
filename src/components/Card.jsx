/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Card = ({ res }) => {
  
    const [isHeartFilled, setIsHeartFilled]=useState(false)

    const handleHeartClick=()=>{
        setIsHeartFilled(!isHeartFilled)
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
                    <button className="mt-6 btn
    rounded-full px-8 flex text-center text-white font-bold
    bg-button hover:bg-button-hvr"><FaShoppingCart /> Buy Now </button>
                </div>
            </div>
        </div>

    );
};

export default Card;