import React from 'react';
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaShoppingCart, FaTruck, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const OrderTracking = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`);
            return res.data;
        }
    });

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return <FaShoppingCart className="text-yellow-500" />;
            case 'processing':
                return <FaTruck className="text-blue-500" />;
            case 'completed':
                return <FaCheckCircle className="text-green-500" />;
            case 'cancelled':
                return <FaTimesCircle className="text-red-500" />;
            default:
                return null;
        }
    };

    const formatDate = (createdAt) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(createdAt).toLocaleDateString('en-US', options);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Order Tracking</h1>
            
            {orders.length === 0 ? (
                <div className="text-center text-gray-600 py-10">
                    <p>No orders found.</p>
                    <Link 
                        to="/shop" 
                        className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {orders.map((order) => (
                        <div 
                            key={order._id} 
                            className="bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">Order #{order._id.slice(-6)}</h2>
                                    <div className="flex items-center space-x-2">
                                        {getStatusIcon(order.status)}
                                        <span className={`px-3 py-1 rounded-full text-xs uppercase font-bold 
                                            ${order.status?.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                              order.status?.toLowerCase() === 'processing' ? 'bg-blue-100 text-blue-800' : 
                                              order.status?.toLowerCase() === 'completed' ? 'bg-green-100 text-green-800' : 
                                              order.status?.toLowerCase() === 'cancelled' ? 'bg-red-100 text-red-800' : 
                                              'bg-gray-100 text-gray-800'}`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-gray-600">
                                        <span className="font-medium">Date:</span> {formatDate(order.createdAt)}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Total Amount:</span> ${order.price?.toFixed(2)}
                                    </p>
                                    <div className="mt-4">
                                        <Link 
                                            to='/'
                                            className="w-full block text-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderTracking;