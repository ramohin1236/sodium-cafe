import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../Context/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateProfile = () => {

    const {updateUserProfile}=useContext(AuthContext)
    const location=useLocation()
    const navigate =useNavigate()
    const from = location?.state?.from?.pathname ||"/";
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const onSubmit = (data) => {
        const name=data.name;
        const photoURL= data.photoURL;
        updateUserProfile(name,photoURL)
        .then(()=>{
            navigate(from,{replace: true})
        }).catch((error)=>{

        })
        console.log(name,photoURL)
}

  return (
    <div className='flex items-center justify-center h-screen'>
         <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <h3 className='text-2xl text-center font-bold'>Update Your Profile</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input {...register("name")} type="text" placeholder="Your name here..." className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Photo</span>
          </label>
          {/* <input type="file" className="file-input file-input-bordered file-input-secondary w-full max-w-xs" /> */}
          <input {...register("photoURL")} type="text" placeholder="Your name here..." className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-button hover:bg-button-hvr font-bold hover:text-white text-white">Update</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default UpdateProfile