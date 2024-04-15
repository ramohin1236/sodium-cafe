/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from './../../firebase.config';
import axios from 'axios';





export const AuthContext = createContext()
const googleProvider = new GoogleAuthProvider()



const AuthProvider = ({children}) => {
const [user,setUser]=useState(null)
const [loading,setLoading]=useState(true)

 const auth = getAuth(app)
 
// create an account

 const createUser=(email,password)=>{
    setLoading(true)
    return  createUserWithEmailAndPassword(auth,email,password)
 }

  //6. Login with Password
  const signin = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

 // 4. Google Signin
 const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const logout =() => {
    setLoading(true)
    // await removeToken
    return signOut(auth)
  }

   //7. Forget Password
   const resetPassword = email => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }


   //   2. Update Name
   const updateUserProfile = (name, photoURL) => {
    setLoading(true)
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    })
  }


  //   3. Email Verify
  const verifyEmail = () => {
    setLoading(true)
    return sendEmailVerification(auth.currentUser)
  }


  useEffect(() => {
    //this part will execute once the component is mounted.
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        console.log("current user---->",currentUser);
      setUser(currentUser)
     if(currentUser){
        const userInfo ={email: currentUser.email}
        axios.post('http://localhost:8000/jwt',userInfo)
        .then( (response)=> {
        //   console.log(response.data.token);
          if(response.data.token){
            localStorage.setItem("access-token", response.data.token)
          }
        })
        
     }
     else{
        localStorage.removeItem("access-token")
     }
      setLoading(false)
    })

    return () => {
        //this part will execute once the component is unmounted.
       return unsubscribe()
      }
    }, [auth])



    const authInfo={
       user,
       loading,
       setLoading,
       createUser,
       updateUserProfile,
       verifyEmail,
       signInWithGoogle,
       logout,
       signin,
       resetPassword,
      
    }
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider