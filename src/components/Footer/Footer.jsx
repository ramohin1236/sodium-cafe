import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    const quickLinks = [
        { name: 'Menu', path: '/menu' },
        { name: 'About Us', path: '/about' },
        { name: 'Reservations', path: '/reservations' },
        { name: 'Contact', path: '/contact' }
    ];

    const openHours = [
        { day: 'Monday - Friday', hours: '09:00 AM - 10:00 PM' },
        { day: 'Saturday', hours: '09:00 AM - 11:00 PM' },
        { day: 'Sunday', hours: '10:00 AM - 09:00 PM' }
    ];

    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <FaUtensils className="text-red-500 text-2xl" />
                            <h2 className="text-3xl font-bold">Sodium Cafe</h2>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Experience the perfect blend of taste and tradition. 
                            Your ultimate destination for delightful dining experiences.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-300">
                                <FaFacebookF className="text-lg" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-300">
                                <FaTwitter className="text-lg" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-300">
                                <FaInstagram className="text-lg" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-300">
                                <FaYoutube className="text-lg" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 relative inline-block pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-2/3 after:h-0.5 after:bg-red-500">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link 
                                        to={link.path}
                                        className="text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2"
                                    >
                                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 relative inline-block pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-2/3 after:h-0.5 after:bg-red-500">
                            Opening Hours
                        </h3>
                        <ul className="space-y-3">
                            {openHours.map((schedule, index) => (
                                <li key={index} className="text-gray-400">
                                    <span className="block font-medium text-white">{schedule.day}</span>
                                    {schedule.hours}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 relative inline-block pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-2/3 after:h-0.5 after:bg-red-500">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400">
                                <FaMapMarkerAlt className="text-red-500 text-xl mt-1" />
                                <span>123 Restaurant Lane, Food Street, Dhaka, 1362</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <FaPhone className="text-red-500" />
                                <span>+880 1533 872 264</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <FaEnvelope className="text-red-500" />
                                <span>awalmohin0@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 py-6">
                    <p className="text-center text-gray-500">
                        © {new Date().getFullYear()} Sodium Cafe. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;