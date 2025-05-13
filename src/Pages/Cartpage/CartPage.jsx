import React, { useContext, useState } from 'react';
import useCart from '../../hooks/useCart';
import { FaTrash, FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthProvider';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const [cart, refetch] = useCart();
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleIncrease = (item) => {
        setLoading(true);
        fetch(`https://sodium-cafe-mongoose.onrender.com/carts/${item?._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ quantity: item.quantity + 1 })
        })
            .then(res => res.json())
            .then(data => {
                const updateCart = cart.map((cartItem) => {
                    if (cartItem.id === item.id) {
                        return {
                            ...cartItem,
                            quantity: cartItem.quantity + 1
                        };
                    }
                    return cartItem;
                });
                setCartItems(updateCart);
                refetch();
            })
            .catch(error => {
                console.error('Error updating cart:', error);
            })
            .finally(() => setLoading(false));
    };

    const handleDecrease = (item) => {
        if (item.quantity <= 1) return;
        setLoading(true);
        fetch(`https://sodium-cafe-mongoose.onrender.com/carts/${item?._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ quantity: item.quantity - 1 })
        })
            .then(res => res.json())
            .then(data => {
                const updateCart = cart.map((cartItem) => {
                    if (cartItem.id === item.id) {
                        return {
                            ...cartItem,
                            quantity: cartItem.quantity - 1
                        };
                    }
                    return cartItem;
                });
                setCartItems(updateCart);
                refetch();
            })
            .catch(error => {
                console.error('Error updating cart:', error);
            })
            .finally(() => setLoading(false));
    };

    const handleDelete = (item) => {
        Swal.fire({
            title: "Remove Item?",
            text: "Are you sure you want to remove this item from your cart?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, remove it",
            cancelButtonText: "Cancel",
            borderRadius: "10px"
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                fetch(`https://sodium-cafe-mongoose.onrender.com/carts/${item?._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Removed!",
                                text: "Item has been removed from your cart",
                                icon: "success"
                            });
                        }
                        refetch();
                    })
                    .finally(() => setLoading(false));
            }
        });
    };

    const calculatePrice = (item) => {
        return item.price * item.quantity;
    };

    const calculateTotalPrice = cart.reduce((total, item) => {
        return total + calculatePrice(item);
    }, 0);

    const orderTotal = calculateTotalPrice;
    const deliveryFee = 60;
    const tax = (orderTotal * 0.05).toFixed(2);
    const grandTotal = (orderTotal + deliveryFee + parseFloat(tax)).toFixed(2);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center gap-6 px-4">
                <FaShoppingCart className="text-6xl text-gray-300" />
                <h2 className="text-3xl font-bold text-gray-800 text-center">Your Cart is Empty</h2>
                <p className="text-gray-600 text-center max-w-md">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/menu" className="bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition-colors">
                    Browse Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Your Cart</h1>
                    <p className="text-gray-600">Review your items and proceed to checkout</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            {cart.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 border-b border-gray-100">
                                    <div className="flex-shrink-0">
                                        <img src={item?.image} alt={item?.name} className="w-20 h-20 object-cover rounded-lg" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-gray-800">{item?.name}</h3>
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleDecrease(item)}
                                                    className={`p-1 rounded-full ${item.quantity <= 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <FaMinus className="w-3 h-3" />
                                                </button>
                                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleIncrease(item)}
                                                    className="p-1 rounded-full text-gray-600 hover:bg-gray-100"
                                                >
                                                    <FaPlus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <span className="text-gray-600">৳ {calculatePrice(item).toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(item)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>৳ {orderTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery Fee</span>
                                    <span>৳ {deliveryFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (5%)</span>
                                    <span>৳ {tax}</span>
                                </div>
                                <div className="border-t border-gray-100 pt-4">
                                    <div className="flex justify-between font-bold text-gray-800">
                                        <span>Total</span>
                                        <span>৳ {grandTotal}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full bg-red-500 text-white py-3 rounded-lg mt-6 hover:bg-red-600 transition-colors font-medium">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;