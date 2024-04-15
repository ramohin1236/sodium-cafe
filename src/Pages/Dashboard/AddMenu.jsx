import React from 'react'
import { FaUtensils } from 'react-icons/fa'
import { useForm } from "react-hook-form"
import useAxios from '../../hooks/useAxios'
import useAxiosSecure from './../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddMenu = () => {
   
    const {register,handleSubmit,reset} = useForm()
    const axiosPublic = useAxios()
    const axiosSecure = useAxiosSecure()
   
   
   
    const image_hostin_api = import.meta.env.VITE_IMAGE_API_KEY


    const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hostin_api}`
  
      const onSubmit =async (data) => {
        const imageFile= {image: data.image[0]}
        const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
            headers:{
                'content-type':'multipart/form-data'
            }
        })
        if(hostingImg.data.success){
            const menuItem ={
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: hostingImg.data.data.display_url
            };
            const postMenuItem = axiosSecure.post('/menu', menuItem)
           console.log(postMenuItem);
            if(postMenuItem){
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Food Added",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
       
    }
    
    





  return (
    <div className='w-full md:w-[870px] px-4 mx-auto'>
        <h2 className='text-3xl font-semibold my-4'>Upload A New <span className='text-button font-bold'>Menu Items</span></h2>
        {/* from here */}
        <div>
            <form  onSubmit={handleSubmit(onSubmit)}>
              
                  <div className="form-control w-full ">
  <label className="label">
    <span className="label-text">Recipe Name</span>
  
  </label>
  <input 
  {...register("name",{required: true})}
  type="text" placeholder="Recipe Name" className="input input-bordered w-full " required/>
 
                </div>
                {/* 2nd row */}
               <div className='flex gap-8'>
               <div className="form-control w-full my-6 ">
  <label className="label">
    <span className="label-text">Choose Category</span>
  
  </label>
  {/* categories */}
  <select
   {...register("category",{required: true})}
  className="select select-bordered" defaultValue='default'>
    <option disabled value='default'>Select a Category</option>
    <option value={"Chicken"}>Chicken</option>
    <option value={"Noodles"}>Noodles</option>
    <option value={"Set-menu"}>Set-menu</option>
    <option value={"Salad"}>Salad</option>
    <option value={"Vegetable"}>Vegetable</option>
    <option value={"Prawn"}>Prawn</option>
    <option value={"Fried Rice"}>Fried Rice</option>
    <option value={"Beef"}>Beef</option>
    <option value={"Drinks"}>Drinks</option>
    <option value={"Ice Cream"}>Ice Cream</option>
    <option value={"Soup"}>Soup</option>
    <option value={"Chicken-Fry"}>Chicken-Fry</option>
    <option value={"Momo"}>Momo</option>
    <option value={"Steak"}>Steak</option>
    <option value={"Sea Platter"}>Sea Platter</option>
    <option value={"Sea Masala"}>Sea Masala</option>
    <option value={"Sea Fry"}>Sea Fry</option>
    <option value={"Rice Bowl"}>Rice Bowl</option>
    <option value={"Pizza"}>Pizza</option>
    <option value={"Pasta"}>Pasta</option>
    <option value={"Burger"}>Burger</option>
    <option value={"Shawarma"}>Shawarma</option>
  </select>
 
                </div>

                <div className="form-control w-full my-6">
  <label className="label">
    <span className="label-text">Price</span>
  
  </label>
  <input
   {...register("price",{required: true})}
  type="number" placeholder="Price" className="input input-bordered w-full " required/>
 
                </div>
               </div>

               {/* 3rd row */}
               <div className="form-control">
  <div className="label">
    <span className="label-text">Recipe Details</span>
  </div>
  <textarea
  {...register("recipe",{required: true})}
  className="textarea textarea-bordered h-24" placeholder="Tel About Your Recipe"></textarea>
  
                </div>

                {/* 4th row */}
                <div className="form-control w-full ">
  <div className="label">
    <span className="label-text mt-6">Upload A Photo</span>
    
  </div>
         <div className='form-control w-full '>
         <input
           {...register("image",{required: true})}
         type="file" className="file-input w-full " />
         </div>
 
                </div>


          <div className='mt-12 text-center '>
             <button className='btn bg-button hover:bg-button-hvr text-xl font-bold text-white w-3/4 '><FaUtensils/> Add Item</button>
          </div>


            </form>
        </div>
    </div>
  )
}

export default AddMenu