import React from 'react';
import { BiArrowToRight } from 'react-icons/bi';
import banner from '/public/banner.png';
import small from '/public/small-1.png';
import noodles from '/public/noodles.png';
const Banner = () => {
    return (
        <div className='section-container  bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
           <div className='py-24 flex flex-col md:flex-row justify-between items-center gap-8'>
            {/* text */}
              <div className='md:w-1/2 space-y-7 px-4'>
                <p className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>Dive into Delights of Delectable Food with <span className='text-button-hvr md:text-6xl'>Sodium Cafe</span></p>

                <button className="mt-6 btn
    rounded-full px-8 flex text-center text-white font-bold
    bg-button hover:bg-button-hvr"> Order Now <BiArrowToRight className='text-2xl'/></button>
              </div>
              {/* image */}
              <div className='md:w-1/2 '>
               <img src={banner} alt="" />

               <div className='flex gap-6 flex-col md:flex-row items-center justify-around -mt-20'>
                   <div className='flex justify-start items-center shadow-2xl rounded-3xl pl-4 w-96 bg-white h-36'>
                    <img src={small} className='w-32' alt="" />
                    <div className='space-y-2'>
                        <h5 className='font-bold text-xl'>Fried Rice</h5>
                        <h5 className='text-xl font-semibold'>160 tk</h5>
                        <div className="rating rating-sm">
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-button" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-button" checked />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-button" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-button" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-button" />
</div>
                    </div>
                   </div>
                   {/* second picture */}
                   <div className='hidden  md:flex justify-start items-center shadow-2xl rounded-3xl pl-4 w-96 bg-white  h-36'>
                    <img src={noodles} className='w-32' alt="" />
                    <div className='space-y-2'>
                        <h5 className='font-bold text-xl'>Chowmin</h5>
                        <h5 className='text-xl font-semibold'>190 tk</h5>
                        <div className="rating rating-sm">
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-button" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-button" checked />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-button" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-button" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-button" />
</div>
                    </div>
                   </div>
               </div>
              </div>
           </div>
        </div>
    );
};

export default Banner;