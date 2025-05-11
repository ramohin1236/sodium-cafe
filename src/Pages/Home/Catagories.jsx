import React from 'react';

const Catagories = () => {
    const cateItems = [
        {id: 1, title: "Burger", des: "(11 dishes)", image: 'https://i.ibb.co/vVqfwVD/banner.png'},
        {id: 2, title: "Fried Rice", des: "(6 dishes)", image: "https://i.ibb.co/NZrwWJm/fried-rice-1.png"},
        {id: 3, title: "Chicken Fry", des: "(5 dishes)", image: "https://i.ibb.co/NC3pk9w/chicken.png"},
        {id: 4, title: "Appetizer", des: "(10 dishes)", image: "https://i.ibb.co/vdY5qgs/nachos.png"}
    ];

    return (
        <div className='container py-16 px-4'>
            <div className='text-center mb-12'>
                <p className='text-red-500 font-medium mb-2'>What We Offer</p>
                <h3 className='text-4xl font-bold text-gray-800 relative inline-block pb-4 after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-2/3 after:h-1 after:bg-red-500'>
                    Popular Categories
                </h3>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
                {cateItems.map((item) => (
                    <div key={item.id} 
                        className='group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer'
                    >
                        <div className='relative overflow-hidden mb-6'>
                            <div className='aspect-square rounded-full bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4 group-hover:scale-105 transition-transform duration-300'>
                                <img 
                                    src={item.image} 
                                    alt={item.title}
                                    className='w-3/4 h-3/4 object-contain'
                                />
                            </div>
                            <div className='absolute inset-0 bg-gradient-to-t from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full'></div>
                        </div>
                        <div className='text-center space-y-2'>
                            <h4 className='text-xl font-bold text-gray-800 group-hover:text-red-500 transition-colors duration-300'>
                                {item.title}
                            </h4>
                            <p className='text-gray-600 font-medium'>
                                {item.des}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Catagories;