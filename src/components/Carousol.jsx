/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import firstcaro from '/public/caro-5.jpg'
import secondcaro from '/public/caro-6.jpg'
import thirdcaro from '/public/caro-8.jpg'
import { BiArrowToRight } from 'react-icons/bi';
const Carousol = () => {
   
  return (
    <Carousel autoPlay={true}  showThumbs={false}>
   <div style={{ position: 'relative' }}>
    <img src={firstcaro} className='h-96 md:h-[550px] object-cover rounded-lg' style={{ opacity: 0.7 }} />
    <div className='md:-mt-36 absolute inset-0 flex items-center justify-center'>
        <div>
            <p className='text-4xl md:text-6xl font-bold text-black relative z-10'>For the Love of Junk <span className='text-button'>Food</span></p>
            <p className='mt-6 md:text-2xl text-black font-bold leading-snug'>Embark on an exclusive culinary journey that welcomes everyone to indulge in our restaurant's vibrant flavors.  Join us in celebrating <br /> food as a universal language, where every dish invites all to savor the joy of dining together.</p>
            <button  className="mt-6 btn rounded-full px-8 flex text-center text-white font-bold bg-button hover:bg-button-hvr"> Order Now <BiArrowToRight className='text-2xl' /></button>
        </div>
    </div>
    <div className='absolute inset-0 bg-blue-400 opacity-20 rounded-lg' style={{ pointerEvents: 'none' }}></div>
</div>

<div style={{ position: 'relative' }}>
    <img src={secondcaro} className='h-96 md:h-[550px] object-cover rounded-lg' style={{ opacity: 0.7 }} />
    <div className='md:-mt-36 absolute inset-0 flex items-center justify-center'>
        <div>
            <p className='text-4xl md:text-6xl font-bold text-black relative z-10'>For the Love of Junk <span className='text-button'>Food</span></p>
            <p className='mt-6 md:text-2xl text-black font-bold leading-snug'>Embark on an exclusive culinary journey that welcomes everyone to indulge in our restaurant's vibrant flavors.  Join us in celebrating <br /> food as a universal language, where every dish invites all to savor the joy of dining together.</p>
            <button  className="mt-6 btn rounded-full px-8 flex text-center text-white font-bold bg-button hover:bg-button-hvr"> Order Now <BiArrowToRight className='text-2xl' /></button>
        </div>
    </div>
    <div className='absolute inset-0 bg-blue-400 opacity-20 rounded-lg' style={{ pointerEvents: 'none' }}></div>
</div>
<div style={{ position: 'relative' }}>
    <img src={thirdcaro} className='h-96 md:h-[550px] object-cover rounded-lg' style={{ opacity: 0.7 }} />
    <div className='md:-mt-36 absolute inset-0 flex items-center justify-center'>
        <div>
            <p className='text-4xl md:text-6xl font-bold text-black relative z-10'>For the Love of Junk <span className='text-button'>Food</span></p>
            <p className='mt-6 md:text-2xl text-black font-bold leading-snug'>Embark on an exclusive culinary journey that welcomes everyone to indulge in our restaurant's vibrant flavors.  Join us in celebrating <br /> food as a universal language, where every dish invites all to savor the joy of dining together.</p>
            <button  className="mt-6 btn rounded-full px-8 flex text-center text-white font-bold bg-button hover:bg-button-hvr"> Order Now <BiArrowToRight className='text-2xl' /></button>
        </div>
    </div>
    <div className='absolute inset-0 bg-blue-400 opacity-20 rounded-lg' style={{ pointerEvents: 'none' }}></div>
</div>
</Carousel>
  )
}

export default Carousol