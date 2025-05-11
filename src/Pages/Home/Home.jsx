import React from 'react';
import Banner from '../../components/Navbar/Banner';
import Catagories from './Catagories';
import SpecialDishes from './SpecialDishes';
import Features from '../../components/Home/Features';
import About from '../../components/Home/About';
import Chef from '../../components/Home/Chef';
import Newsletter from './Newsletter';

const Home = () => {
   

    return (
        <div className="overflow-hidden">
            <Banner/>
            <Catagories/>
            <SpecialDishes/>
            <Features/>
             <About/>
             <Chef/>
            <Newsletter/>                 
           
        </div>
    );
};

export default Home;