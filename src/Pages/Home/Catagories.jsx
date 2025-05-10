import React from 'react';


const Catagories = () => {

    const cateItems=[
        {id:1, title:"Burger",des:"(11 dishes)", image:'https://i.ibb.co/vVqfwVD/banner.png'},
        {id:2, title:"Fried Rice",des:"(6 dishes)", image:"https://i.ibb.co/NZrwWJm/fried-rice-1.png"},
        {id:3, title:"Chicken Fry",des:"(5 dishes)", image:"https://i.ibb.co/NC3pk9w/chicken.png"},
        {id:4, title:"Appetizer",des:"(10 dishes)", image:"https://i.ibb.co/vdY5qgs/nachos.png"}
    ]

    return (
        <div className='section-container py-16'>
          <div className='text-center'>
          <h3 className='title'>Poular Categories</h3>
          </div>

          {/* categories card */}
          <div className='flex flex-col sm:flex-row flex-wrap gap-8 justify-around mt-16 items-center'>
              {cateItems.map((item,idx)=>(
                <div key={idx} 
                className='shadow-xl rounded-md bg:white py-3 px-5 w-64 h-52 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all'
                >
                     <div
                     className='flex w-full mx-auto items-center justify-center'
                     ><img src={item.image} alt="" className='bg-button rounded-full w-28 h-28 p-3'/></div>
                     <div className='mt-5 space-y-1'>
                        <p className='font-bold '>{item.title}</p>
                        <p className='font-medium'> {item.des}</p>
                     </div>
                </div>
              ))}
          </div>
        </div>
    );
};

export default Catagories;