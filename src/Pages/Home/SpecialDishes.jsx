import React, { useEffect, useState, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from './../../components/Card';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const CustomArrow = ({ direction, onClick }) => (
  <button
      onClick={onClick}
      className={`absolute z-10 top-1/2 -translate-y-1/2 ${direction === 'next' ? '-right-4' : '-left-4'}
          w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm
          text-red-500 shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
  >
      {direction === 'next' ? <FaAngleRight className="w-6 h-6" /> : <FaAngleLeft className="w-6 h-6" />}
  </button>
);

const SpecialDishes = () => {
    const [recipes, setRecipes] = useState([]);
    const sliderRef = useRef(null);

    useEffect(() => {
        fetch('https://sodium-cafe-mongoose.onrender.com/menu')
            .then(res => res.json())
            .then(data => {
                const special = data.filter((items) => items.cat === "popular");
                setRecipes(special);
            });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        cssEase: "cubic-bezier(0.87, 0.03, 0.41, 0.9)",
        nextArrow: <CustomArrow direction="next" />,
        prevArrow: <CustomArrow direction="prev" />,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
      <div className="py-16 px-4 md:px-8 lg:px-16">
      {/* Header Section */}
      <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-red-500 font-medium mb-2">Special Selection</p>
          <h2 className="text-4xl font-bold text-gray-800 relative inline-block pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-2/3 after:h-1 after:bg-red-500">
              Special Dishes
          </h2>
          <p className="mt-4 text-gray-600">
              Experience our chef's specially curated dishes that will delight your taste buds
          </p>
      </div>

      {/* Slider Section */}
      <div className="relative max-w-7xl mx-auto px-8">
          <div className=" rounded-xl">
              <Slider ref={sliderRef} {...settings} className="special-dishes-slider -mx-4">
                  {recipes.map((recipe, index) => (
                      <div key={index} className="px-4 py-2">
                          <Card res={recipe} />
                      </div>
                  ))}
              </Slider>
          </div>
      </div>
  </div>
    );
};

export default SpecialDishes;