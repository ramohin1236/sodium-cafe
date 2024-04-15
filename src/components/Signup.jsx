/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import Modal from './Modal'
import { AuthContext } from '../Context/AuthProvider'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import useAxios from '../hooks/useAxios'

const Signup = () => {
    const [errorMessage, setErrorMessage]=useState('')
    const location=useLocation()
    const navigate =useNavigate()
    const from = location?.state?.from?.pathname ||"/";
        const axiosPublic =useAxios()
    const {
        register,
        handleSubmit,
         formState: { errors },
      } = useForm()


      const {createUser,signInWithGoogle,logout,updateUserProfile}=useContext(AuthContext);


      const onSubmit = (data) => {
        const email= data.email;
    
        const password= data.password;
        createUser(email,password)
        .then((result)=>{
            const user= result.user;


            updateUserProfile(data.email,data.photoURL).then(()=>{
                const userInfo ={
                    name: data.name,
                    email: data.email
                }
                axiosPublic.post('/users', userInfo)
                  .then( (response)=> {
                    console.log(response);
                  })
            })

            logout();
            
            document.getElementById('my_modal_5').showModal()
            toast.success("User Created Successfully")
        })
        .catch((error)=>{
            const errorMessage= error.message;
            setErrorMessage("Something ")
          
        })
        console.log( email,password
        )}


        const handlesignInWithGoogle =()=>{
            signInWithGoogle()
            .then((result)=>{
                const user = result.user
                const userInfo ={
                    name: result?.user?.displayName,
                    email: result?.user?.email
                }
                axiosPublic.post('/users', userInfo)
                  .then( (response)=> {
                    console.log(response);
                  })
                console.log("user",user);
                navigate(from,{replace: true})
                toast.success("User Created Successfully!")
            }).catch((error)=>console.log(error))
      }
    














  return (
   <div className='max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20'>
         <div className="modal-action mt-0 flex flex-col ">
            {/* login */}
          <form 
          onSubmit={handleSubmit(onSubmit)}
          className="card-body" method="dialog">
          <p className="text-3xl font-bold text-center">Sign UP</p>
          <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="name" placeholder="Name" className="input input-bordered" required 
           {...register("name")}
          />
        </div>
          {/* email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required 
           {...register("email")}
          />
        </div>

        {/* password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required 
            {...register("password")}
          />
          <label className="label mt-2">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <input type="Submit" value={"Login"} className="btn bg-button hover:bg-button-hvr font-bold text-white"/>
        </div>
        <p className="text-center my-2">Have an account? <button
          onClick={()=>document.getElementById('my_modal_5').showModal()}
        className="font-bold underline text-button">Login</button ></p>
      </form>
               {/* social login */}
               <div className="text-center mr-2">
               <button className="btn btn-circle  hover:bg-button-hvr text-black hover:text-white">
               <FaGoogle
               onClick={handlesignInWithGoogle}
               className="font-bold text-xl hover:text-white"/>
</button>
<button
 className="btn btn-circle  hover:bg-button-hvr text-black hover:text-white ml-2 mr-2">
               <FaFacebook className="font-bold text-xl hover:text-white"/>
</button>
<button className="btn btn-circle  hover:bg-button-hvr text-black hover:text-white ml-2">
               <FaGithub className="font-bold text-xl hover:text-white"/>
</button>
               </div>
          </div>
          <Modal/>
   </div>
  )
}

export default Signup