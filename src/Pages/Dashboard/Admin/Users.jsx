import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { FaUser } from 'react-icons/fa'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import { ref } from 'firebase/storage'

const Users = () => {
   const axiosSecure =useAxiosSecure() 
    const {refetch,data:users= []} =useQuery({
        queryKey:['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
             return res.data ;
          },
    })
  

    const handleMakeAdmin =(user)=>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res=>{
            toast.success(`${user.name} is now admin`)
            refetch()
        })
       
    }


    const handleDeleteUser =(user)=>{
        axiosSecure.delete(`/users/${user._id}`)
        .then(res=>{
            toast.success(`${user.name} is removed from database`)
            refetch()
        })
    }

   return (
    <div className='w-full md:w-[1200px] px-2 md:px-4'>
       <div className='flex items-center justify-between w-full mx-2 md:mx-4 my-4'>
           <h5 className='text-xl md:text-2xl'>All Users</h5>
           <h5 className='text-xl md:text-2xl'>Total Users: {users.length}</h5>
       </div>
       {/* table */}
       <div className="overflow-x-auto w-full">
  <table className="table table-zebra w-full" >
    {/* head */}
    <thead className='bg-button text-white font-bold text-lg rounded-lg'>
      <tr>
        <th className='min-w-[50px]'>#</th>
        <th className='min-w-[150px]'>Name</th>
        <th className='min-w-[200px]'>Email</th>
        <th className='min-w-[100px]'>Role</th>
        <th className='min-w-[120px]'>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        users.map((usr,idx)=>(
            <tr key={idx} className='text-lg'>
            <th>{idx+1}</th>
            <td>{usr.name}</td>
            <td>{usr.email}</td>
            <td>{usr.role === 'admin'? "Admin":<>
            <button 
            onClick={()=>handleMakeAdmin(usr)}
            className='btn bg-button btn-sm'><FaUser/></button>
            </>
            
            }</td>
            <td><button
            onClick={()=>handleDeleteUser(usr)}
            className='btn btn-sm bg-red-500 hover:bg-red-700 text-white font-bold'>cancel</button></td>
          </tr>
        ))
      }
    </tbody>
  </table>
</div>
    </div>
  )
}

export default Users