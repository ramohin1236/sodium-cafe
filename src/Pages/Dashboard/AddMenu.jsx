import React from 'react'
import { FaUtensils } from 'react-icons/fa'
import { useForm } from "react-hook-form"
import useAxios from '../../hooks/useAxios'
import useAxiosSecure from './../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddMenu = () => {
    const {register,handleSubmit,reset } = useForm()
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
            const postMenuItem = await axiosSecure.post('/menu', menuItem)
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
        <div className='w-full md:w-[1200px] px-4 md:px-6'>
            <div className='flex items-center justify-between w-full mb-6'>
                <h2 className='text-2xl md:text-3xl font-semibold'>Add New <span className='text-button font-bold'>Menu Item</span></h2>
            </div>

            <div className='bg-base-100 rounded-lg p-6 shadow-md'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-lg">Recipe Name</span>
                        </label>
                        <input 
                            {...register("name",{required: true})}
                            type="text" 
                            placeholder="Recipe Name" 
                            className="input input-bordered w-full text-lg" 
                            required
                        />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Choose Category</span>
                            </label>
                            <select
                                {...register("category",{required: true})}
                                className="select select-bordered text-lg"
                                defaultValue='default'
                            >
                                <option disabled value='default'>Select a Category</option>
                                <option value="Chicken">Chicken</option>
                                <option value="Noodles">Noodles</option>
                                <option value="Set-menu">Set-menu</option>
                                <option value="Salad">Salad</option>
                                <option value="Vegetable">Vegetable</option>
                                <option value="Prawn">Prawn</option>
                                <option value="Fried Rice">Fried Rice</option>
                                <option value="Beef">Beef</option>
                                <option value="Drinks">Drinks</option>
                                <option value="Ice Cream">Ice Cream</option>
                                <option value="Soup">Soup</option>
                                <option value="Chicken-Fry">Chicken-Fry</option>
                                <option value="Momo">Momo</option>
                                <option value="Steak">Steak</option>
                                <option value="Sea Platter">Sea Platter</option>
                                <option value="Sea Masala">Sea Masala</option>
                                <option value="Sea Fry">Sea Fry</option>
                                <option value="Rice Bowl">Rice Bowl</option>
                                <option value="Pizza">Pizza</option>
                                <option value="Pasta">Pasta</option>
                                <option value="Burger">Burger</option>
                                <option value="Shawarma">Shawarma</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Price</span>
                            </label>
                            <input
                                {...register("price",{required: true})}
                                type="number" 
                                placeholder="Price" 
                                className="input input-bordered w-full text-lg" 
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg">Recipe Details</span>
                        </label>
                        <textarea
                            {...register("recipe",{required: true})}
                            className="textarea textarea-bordered h-24 text-lg"
                            placeholder="Tell About Your Recipe"
                        ></textarea>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg">Upload Photo</span>
                        </label>
                        <input
                            {...register("image",{required: true})}
                            type="file" 
                            className="file-input w-full text-lg"
                        />
                    </div>

                    <div className='text-center'>
                        <button className='btn bg-button hover:bg-button-hvr text-xl font-bold text-white w-full md:w-1/2'>
                            <FaUtensils className='mr-2'/> Add Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddMenu