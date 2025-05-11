import React from 'react';
import aboutImg from '/public/about1.jpg';
import aboutHoverImg from '/public/about2.jpg';
import { FaUtensils, FaUsers, FaAward, FaCoffee } from 'react-icons/fa';

const About = () => {
    const stats = [
        { icon: <FaUtensils />, count: '150+', label: 'Menu Items' },
        { icon: <FaUsers />, count: '5000+', label: 'Happy Customers' },
        { icon: <FaAward />, count: '15+', label: 'Awards' },
        { icon: <FaCoffee />, count: '3', label: 'Restaurant Branches' }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-red-500 font-medium mb-2">Our Journey</p>
                    <h2 className="text-4xl font-bold text-gray-800 relative inline-block pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-2/3 after:h-1 after:bg-red-500">
                        Our Story
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Enhanced Image Section */}
                    <div className="relative">
                        {/* Main Image Container */}
                        <div className="relative z-20 group">
                            <img 
                                src={aboutImg} 
                                alt="Restaurant ambiance" 
                                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover 
                                         transition-all duration-500 group-hover:opacity-0"
                            />
                            <img 
                                src={aboutHoverImg} 
                                alt="Restaurant ambiance hover" 
                                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover 
                                         transition-all duration-500 absolute inset-0 opacity-0 
                                         group-hover:opacity-100"
                            />
                            
                            {/* Decorative Elements */}
                            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-red-500 
                                         rounded-lg z-10 transition-transform duration-300 
                                         group-hover:translate-x-2 group-hover:translate-y-2"></div>
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-red-500 
                                         rounded-lg z-10 transition-transform duration-300 
                                         group-hover:-translate-x-2 group-hover:-translate-y-2"></div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 z-30">
                            <div className="bg-white p-4 rounded-full shadow-xl animate-bounce">
                                <FaUtensils className="w-8 h-8 text-red-500" />
                            </div>
                        </div>
                        <div className="absolute bottom-1/2 -left-8 transform translate-y-1/2 z-30">
                            <div className="bg-white p-4 rounded-full shadow-xl animate-bounce delay-150">
                                <FaCoffee className="w-8 h-8 text-red-500" />
                            </div>
                        </div>

                        {/* Background Pattern */}
                        <div className="absolute inset-y-8 -left-8 w-full h-full bg-[radial-gradient(#ef444422_1px,transparent_1px)] 
                                      [background-size:16px_16px] -z-10"></div>
                    </div>

                    {/* Content Section - Unchanged */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-3xl font-bold mb-4 text-gray-800">Crafting Culinary Excellence Since 2010</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Founded with an unwavering passion for culinary excellence, we've been on a remarkable journey 
                                of bringing people together through exceptional dining experiences. Our commitment to quality 
                                and tradition, combined with innovative culinary techniques, makes every meal at our restaurant 
                                truly special.
                            </p>
                            <button className="bg-red-500 text-white px-8 py-4 rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                                Discover More
                            </button>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-6 mt-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors duration-300">
                                    <div className="text-red-500 text-2xl mb-2">{stat.icon}</div>
                                    <div className="text-2xl font-bold text-gray-800">{stat.count}</div>
                                    <div className="text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;