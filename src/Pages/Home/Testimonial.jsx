import React from 'react';
import { FaPhone } from 'react-icons/fa';

const Testimonial = () => {
    return (
        <div className='section-container mt-20 mb-28'>
            <p className='text-5xl font-bold text-center my-10'>Contact With Us</p>
            <div className='flex flex-col md:flex-row items-centero justify-between gap-12 mt-12'>
                <div className='md:w-1/2'>
                    <img className='rounded-2xl h-[500px] w-full object-cover' src="/public/432720033_386833024106507_7408708563593600012_n.jpg" alt="" />
                </div>
                <div className='md:w-1/2 justify-center items-center flex'>
                <form className="border w-full p-16 rounded-2xl bg-slate-200">
             
             <p className='flex items-center justify-end gap-2 text-xl font-semibold text-center'><FaPhone/> 01964544554</p>
         
      <div className="">
        <label className="label">
          <span className="label-text  text-xl font-semibold">Email</span>
        </label>
        <input type="email" placeholder="email" className="input input-bordered w-full" required />
      </div>
      <label className="form-control">
  <div className="label">
    <span className="label-text text-xl font-semibold">Message</span>
   
  </div>
  <textarea className="textarea textarea-bordered h-24" placeholder="Your message"></textarea>
  
</label>
      <div className="form-control mt-6">
        <button className="btn bg-button hover:bg-button-hvr text-white font-bold">Send Message</button>
      </div>
    </form>
                </div>

               

            </div>

        </div>
    );
};

export default Testimonial;