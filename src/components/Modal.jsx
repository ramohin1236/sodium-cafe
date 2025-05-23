/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxios from "../hooks/useAxios";
const Modal = () => {

  const { signInWithGoogle, signin, user, loading } = useContext(AuthContext)
  const axiosPublic = useAxios()
  const location = useLocation()
  const navigate = useNavigate()
  const from = location?.state?.from?.pathname || "/";

  const [errorMessage, setErrorMessage] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password
    signin(email, password)
      .then(result => {
        const user = result.user;
        const userInfo = {
          name: data.name,
          email: data.email
        }
        axiosPublic.post('/users', userInfo)
          .then((response) => {
            console.log(response);
          })
        document.getElementById('my_modal_5').close()
        navigate(from, { replace: true })
        toast.success("Successfully Login!")
      }).catch((error) => {
        const errorMessage = error.message;
        setErrorMessage("Provide a correct email and password")

      })

  }

  const handlesignInWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email
        }
        axiosPublic.post('/users', userInfo)
          .then((response) => {
            console.log(response);
          })
        console.log("user", user);
        navigate(from, { replace: true })
        toast.success("User Created Successfully!")
      }).catch((error) => console.log(error))
  }



  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">

        <div className="modal-action mt-0 flex flex-col ">
          {/* login */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body" method="dialog">
            <p className="text-3xl font-bold text-center">Login</p>
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
            {
              errorMessage ? <p className="text-red-600">{errorMessage}</p> : ""
            }
            <div className="form-control mt-6">
              <input type="Submit" value={"Login"} className="btn bg-button hover:bg-button-hvr font-bold text-white" />
            </div>

          </form>
            <div className="text-center">
                 <p className="text-center">Haven't any account? <Link to="signup"
         className="font-bold underline text-button">Sign Up</Link ></p>
                </div>
          {/* social login */}
          <div className="text-center mr-2">
            <button
              onClick={handlesignInWithGoogle}
              className="btn btn-circle  hover:bg-button-hvr text-black hover:text-white">
              <FaGoogle className="font-bold text-xl hover:text-white" />
            </button>

          

          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;