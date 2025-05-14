import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


// Import your background images
const backgroundImages = [
    '/menu-first.jpg',
    '/menu-second.jpg',
    '/menu-third.jpg',
    '/menu-fourth.jpg'
];


const MenuBanner = () => {

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
                         Explore Our Exquisite and
                         <span className='block text-[#FF6B6B] mt-2'> Diverse Menu</span>
                     </h1>
                     
                     <p className='text-lg md:text-xl mb-8 text-gray-200'>
                        Discover a delightful selection of dishes crafted with passion and precision. Savor every bite as you explore a menu that blends flavors from around the world.
                     </p>
                   
                     
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
}

export default MenuBanner