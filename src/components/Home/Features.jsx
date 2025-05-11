import React from 'react'
import { FaUtensils, FaTruck, FaClock, FaLeaf } from 'react-icons/fa';

const Features = () => {
      const features = [
            {
                icon: <FaUtensils className="w-8 h-8" />,
                title: "Quality Food",
                description: "We prioritize using the finest ingredients for exceptional taste."
            },
            {
                icon: <FaTruck className="w-8 h-8" />,
                title: "Fast Delivery",
                description: "Quick and reliable delivery to your doorstep."
            },
            {
                icon: <FaClock className="w-8 h-8" />,
                title: "24/7 Service",
                description: "Always available to serve you anytime."
            },
            {
                icon: <FaLeaf className="w-8 h-8" />,
                title: "Fresh Ingredients",
                description: "Only the freshest ingredients make it to your plate."
            }
        ];
  return (
     <section className="py-16 bg-gray-50">
          <div className='text-center mb-12'>
                <p className='text-red-500 font-medium mb-2'>What We Offer</p>
                <h3 className='text-4xl font-bold text-gray-800 relative inline-block pb-4 after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-2/3 after:h-1 after:bg-red-500'>
                    Our Services
                </h3>
            </div>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="text-red-500 mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
  )
}

export default Features