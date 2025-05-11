import React from 'react';
import chefImg from '/public/chef.jpg';
import { FaAward,  FaStar, FaQuoteLeft } from 'react-icons/fa';

const Chef = () => {
    const achievements = [
        {
            icon: <FaAward />,
            title: "Award-winning Expert",
            description: "Multiple culinary awards recipient"
        },
       
        {
            icon: <FaStar />,
            title: "Innovative Menus",
            description: "Creates unique seasonal dishes"
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-red-500 font-medium mb-2">Culinary Excellence</p>
                    <h2 className="text-4xl font-bold text-gray-800 relative inline-block pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-2/3 after:h-1 after:bg-red-500">
                        Meet Our Master Chef
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Section */}
                    <div className="order-1 lg:order-2 relative group">
                        {/* Background Elements */}
                        <div className="absolute inset-0 bg-red-500/10 rounded-[60px] rotate-6 transform transition-transform duration-300 group-hover:rotate-12"></div>
                        <div className="absolute inset-0 bg-gray-900/10 rounded-[60px] -rotate-6 transform transition-transform duration-300 group-hover:-rotate-12"></div>
                        
                        {/* Main Image */}
                        <div className="relative">
                            <img 
                                src={chefImg} 
                                alt="Master Chef" 
                                className="rounded-[48px] shadow-2xl w-full h-[600px] object-cover transform transition-transform duration-500 group-hover:scale-105"
                            />
                            
                            {/* Decorative Elements */}
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-red-500/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gray-900/20 rounded-full blur-2xl"></div>
                            
                            {/* Experience Badge */}
                            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-full shadow-xl transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-red-500">15+</div>
                                    <div className="text-sm text-gray-600">Years of<br/>Experience</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="order-2 lg:order-1 space-y-8">
                        <div className="relative">
                            <FaQuoteLeft className="text-red-500/20 text-6xl absolute -top-4 -left-4" />
                            <h3 className="text-3xl font-bold mb-6 text-gray-800">Mohammad Abbas</h3>
                            <p className="text-gray-600 leading-relaxed mb-8 pl-8">
                                "Cooking is not just about ingredients; it's about bringing people together and creating 
                                memories through exceptional flavors. Every dish tells a story, and I'm here to share 
                                these stories with our guests through innovative and delightful culinary creations."
                            </p>
                        </div>

                        {/* Achievements Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {achievements.map((achievement, index) => (
                                <div 
                                    key={index} 
                                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <div className="text-red-500 text-2xl mb-4">{achievement.icon}</div>
                                    <h4 className="font-bold text-gray-800 mb-2">{achievement.title}</h4>
                                    <p className="text-gray-600 text-sm">{achievement.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <button className="mt-8 bg-red-500 text-white px-8 py-4 rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2">
                           
                            <span>Book a Private Event</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Chef;