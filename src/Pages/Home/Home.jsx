import React from 'react';
import Banner from '../../components/Navbar/Banner';
import Catagories from './Catagories';
import SpecialDishes from './SpecialDishes';
import Testimonial from './Testimonial';
import Services from './Services';

const Home = () => {
    return (
        <div>
           <Banner/>
           <Catagories/>
           <SpecialDishes/>
           {/* testimonial incomplete */}
           <Testimonial/>
           {/* <Services/> */}
        </div>
    );
};

export default Home;