import React, { useContext, useState } from 'react';
import useCart from '../../hooks/useCart';
import { FaTrash, FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CartPage = () => {
    const [cart, refetch] = useCart();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleIncrease = (item) => {
        setLoading(true);
        axiosSecure.put(`/carts/${item?._id}`, { quantity: item.quantity + 1 })
            .then(response => {
                refetch();
                setLoading(false);
            })
            .catch(error => {
                console.error('Error increasing quantity:', error);
                setLoading(false);
            });
    };

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            setLoading(true);
            axiosSecure.put(`/carts/${item?._id}`, { quantity: item.quantity - 1 })
                .then(response => {
                    refetch();
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error decreasing quantity:', error);
                    setLoading(false);
                });
        }
    };

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to remove this item from cart?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${item?._id}`)
                    .then(response => {
                        refetch();
                        Swal.fire('Removed!', 'Item has been removed from cart.', 'success');
                    })
                    .catch(error => {
                        console.error('Error deleting cart item:', error);
                    });
            }
        });
    };

    const handleProceedToCheckout = () => {
        if (!user) {
            Swal.fire({
                title: 'Please Login',
                text: 'You need to login to proceed to checkout',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Login',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signup');
                }
            });
            return;
        }

        if (cart.length === 0) {
            Swal.fire('Oops!', 'Your cart is empty', 'warning');
            return;
        }

        navigate('/process-chekout');
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-24">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>
                
                {cart.length === 0 ? (
                    <div className="text-center text-gray-600">
                        <p>Your cart is empty</p>
                        <Link 
                            to="/menu" 
                            className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div 
                                    key={item._id} 
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div className="flex items-center space-x-4">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div>
                                            <h3 className="font-semibold">{item.name}</h3>
                                            <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center border rounded">
                                            <button 
                                                onClick={() => handleDecrease(item)} 
                                                className="p-2 hover:bg-gray-100"
                                                disabled={loading}
                                            >
                                                <FaMinus />
                                            </button>
                                            <span className="px-4">{item.quantity}</span>
                                            <button 
                                                onClick={() => handleIncrease(item)} 
                                                className="p-2 hover:bg-gray-100"
                                                disabled={loading}
                                            >
                                                <FaPlus />
                                            </button>
                                        </div>
                                        <button 
                                            onClick={() => handleDelete(item)} 
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                            <div>
                                <span className="font-bold">Total:</span>
                                <span className="ml-2 text-xl">${totalPrice.toFixed(2)}</span>
                            </div>
                            <button 
                                onClick={handleProceedToCheckout}
                                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition flex items-center"
                            >
                                <FaShoppingCart className="mr-2" /> Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartPage;