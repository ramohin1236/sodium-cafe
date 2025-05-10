import React from 'react'
import useMenu from '../../../hooks/useMenu'
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageItems = () => {
    const axiosSecure = useAxiosSecure()
    const [menu, , refetch] = useMenu()
    console.log(menu);



    const handleDelete = async (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                if (res) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your item has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    }







    return (
        <div className='w-full md:w-[1200px] px-4 ax-auto'>
            <h2 className='text-3xl font-semibold my-4'>Manage<span className='text-button font-bold'>Menu Items</span></h2>

            {/* menu table */}

            <div className='mt-12 ml-2'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='text-xl text-white bg-button'>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody className='text-xl'>
                            {/* row 1 */}
                            {
                                menu.map((item, idx) => (
                                    <tr key={idx}>
                                        <th>
                                            {idx + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>

                                            </div>
                                        </td>
                                        <td>
                                            {item.name}

                                        </td>
                                        <td>{item.price} TK</td>
                                        <th>
                                            <Link
                                                to={`/dashboard/update-menu/${item._id}`}
                                            >  <button className="btn btn-sm bg-blue-500 text-white font-bold hover:bg-blue-700"><FaEdit /> Edit</button></Link>
                                        </th>
                                        <th>
                                            <button
                                                onClick={() => handleDelete(item)}
                                                className="btn btn-sm bg-red-500 text-white font-bold hover:bg-red-700"><FaTrash /> Delete</button>
                                        </th>
                                    </tr>
                                ))
                            }

                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageItems