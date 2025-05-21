/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import Modal from './Modal'
import { AuthContext } from '../Context/AuthProvider'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
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
        <div className="min-h-screen bg-gray-50 py-12 sm:py-20">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Create your account to continue</p>
              </div>
    
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="name"
                        {...register("name")}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-button focus:border-transparent"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>
    
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="email"
                        {...register("email")}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-button focus:border-transparent"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
    
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        id="password"
                        {...register("password")}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-button focus:border-transparent"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-button hover:bg-button-hvr focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button"
                  >
                    Create Account
                  </button>
                </div>
    
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
    
                <div className=" ">
                  <button
                    onClick={handlesignInWithGoogle}
                    className="relative w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button"
                  >
                    <FaGoogle className="w-5 h-5 mr-2" />
                    Google
                  </button>
                 
                </div>
    
                <div className="text-center">
                 <p className="text-center my-2">Have an account? <button
           onClick={()=>document.getElementById('my_modal_5').showModal()}
         className="font-bold underline text-button">Login</button ></p>
                </div>
              </form>
            </div>
          </div>
          <Modal />
        </div>
      );
    };







//   return (
//    <div className='max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20'>
//          <div className="modal-action mt-0 flex flex-col ">
//             {/* login */}
//           <form 
//           onSubmit={handleSubmit(onSubmit)}
//           className="card-body" method="dialog">
//           <p className="text-3xl font-bold text-center">Sign UP</p>
//           <div className="form-control">
//           <label className="label">
//             <span className="label-text">Name</span>
//           </label>
//           <input type="name" placeholder="Name" className="input input-bordered" required 
//            {...register("name")}
//           />
//         </div>
//           {/* email */}
//         <div className="form-control">
//           <label className="label">
//             <span className="label-text">Email</span>
//           </label>
//           <input type="email" placeholder="email" className="input input-bordered" required 
//            {...register("email")}
//           />
//         </div>

//         {/* password */}
//         <div className="form-control">
//           <label className="label">
//             <span className="label-text">Password</span>
//           </label>
//           <input type="password" placeholder="password" className="input input-bordered" required 
//             {...register("password")}
//           />
//           <label className="label mt-2">
//             <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
//           </label>
//         </div>
//         <div className="form-control mt-6">
//           <input type="Submit" value={"Login"} className="btn bg-button hover:bg-button-hvr font-bold text-white"/>
//         </div>
//         <p className="text-center my-2">Have an account? <button
//           onClick={()=>document.getElementById('my_modal_5').showModal()}
//         className="font-bold underline text-button">Login</button ></p>
//       </form>
//                {/* social login */}
//                <div className="text-center mr-2">
//                <button className="btn btn-circle  hover:bg-button-hvr text-black hover:text-white">
//                <FaGoogle
//                onClick={handlesignInWithGoogle}
//                className="font-bold text-xl hover:text-white"/>
// </button>
// <button
//  className="btn btn-circle  hover:bg-button-hvr text-black hover:text-white ml-2 mr-2">
//                <FaFacebook className="font-bold text-xl hover:text-white"/>
// </button>
// <button className="btn btn-circle  hover:bg-button-hvr text-black hover:text-white ml-2">
//                <FaGithub className="font-bold text-xl hover:text-white"/>
// </button>
//                </div>
//           </div>
//           <Modal/>
//    </div>
//   )
// }

export default Signup