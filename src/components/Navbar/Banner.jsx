import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiArrowToRight } from 'react-icons/bi';
import { Link } from 'react-router-dom';

// Import your background images
const backgroundImages = [
    '/bg.jpg',
    '/bg-2.jpg',
    '/bg-3.jpg',
    '/bg-4.jpg'
];

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-slide functionality
    React.useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(slideInterval);
    }, []);

    return (
        <div className='relative h-[90vh] overflow-hidden'>
            {/* Background Image Slider */}
            <div className='absolute inset-0'>
                {backgroundImages.map((image, index) => (
                    <motion.div 
                        key={index}
                        initial={{ 
                            opacity: 0,
                            scale: 1
                        }}
                        animate={{ 
                            opacity: index === currentSlide ? 1 : 0,
                            scale: index === currentSlide ? 1.1 : 1,
                            transition: { 
                                opacity: {
                                    duration: 2,
                                    ease: "easeInOut"
                                },
                                scale: {
                                    duration: 0.75,
                                    ease: "easeOut"
                                }
                            }
                        }}
                        className='absolute inset-0 bg-cover bg-center'
                        style={{ 
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {/* Overlay to improve text readability */}
                        <div className='absolute inset-0 bg-black/40'></div>
                    </motion.div>
                ))}
            </div>

            {/* Content Overlay */}
            <div className='relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center'>
                <div className='text-white max-w-3xl'>
                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4'>
                        Dive into Delights of 
                        <span className='block text-[#FF6B6B] mt-2'>Delectable Food</span>
                    </h1>
                    
                    <p className='text-lg md:text-xl mb-8 text-gray-200'>
                        Experience culinary magic with our carefully crafted dishes that tantalize your taste buds.
                    </p>
                    <Link to='/menu'>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn bg-[#FF6B6B] hover:bg-[#FF4757] text-white rounded-full 
                        px-10 text-lg flex items-center gap-3 mx-auto"
                    >
                        Order Now <BiArrowToRight className='text-2xl'/>
                    </motion.button>
                    </Link>
                    
                </div>

                {/* Slide Indicators */}
                <div className='absolute bottom-10 left-0 right-0 flex justify-center space-x-3'>
                    {backgroundImages.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                currentSlide === index 
                                    ? 'bg-[#FF6B6B]' 
                                    : 'bg-white/50 hover:bg-white/75'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;