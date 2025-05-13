import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaRegUser, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Modal from '../Modal';
import Profile from '../Profile';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [cart, refetch] = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out 
            bg-black/10 backdrop-blur-sm`}
        >
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link 
                    to='/' 
                    className="text-2xl font-bold text-[#FF6B6B] hover:text-[#4ECDC4] transition-colors"
                >
                    Sodium Cafe
                </Link>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white focus:outline-none"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex space-x-6">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                text-base font-medium 
                                ${isActive 
                                    ? 'text-[#FF6B6B] border-b-2 border-[#FF6B6B]' 
                                    : 'text-white hover:text-[#4ECDC4] transition-colors'}
                            `}
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Mobile Navigation Dropdown */}
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:hidden absolute top-full left-0 right-0 bg-white/90 shadow-lg"
                    >
                        <div className="flex flex-col items-center py-4 space-y-3">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `
                                        text-base font-medium 
                                        ${isActive 
                                            ? 'text-[#FF6B6B]' 
                                            : 'text-gray-700 hover:text-[#FF6B6B]'}
                                    `}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                    {/* Search Button */}
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-white hover:text-[#4ECDC4] hidden md:block"
                    >
                        <FaSearch className="text-xl" />
                    </motion.button>

                    {/* Cart Button */}
                    <Link to='/cart-page' className="relative">
                        <motion.div 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-white hover:text-[#4ECDC4]"
                        >
                            <FaShoppingCart className="text-xl" />
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#FF6B6B] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    {cart.length}
                                </span>
                            )}
                        </motion.div>
                    </Link>

                    {/* Login/Profile Button */}
                    {user ? (
                        <Profile user={user} />
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => document.getElementById('my_modal_5').showModal()}
                            className="btn bg-[#FF6B6B] hover:bg-[#4ECDC4] text-white rounded-full px-6 py-2 flex items-center space-x-2"
                        >
                            <FaRegUser />
                            <span>Login</span>
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Modal */}
            <Modal />
        </header>
    );
};

export default Navbar;