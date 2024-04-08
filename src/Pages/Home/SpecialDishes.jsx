import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from './../../components/Card';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';



const simpleNextArrow = (props)=>{
    const {className,style,onClick}=props;
    return(
        <div
        className={className}
        style={{...style,display:"block", background:"red"}}
        onClick={onClick}
        >
          Next
        </div>
    )
}
const simplePreviewArrow = (props)=>{
    const {className,style,onClick}=props;
    return(
        <div
        className={className}
        style={{...style,display:"block", background:"green"}}
        onClick={onClick}
        >
         Back
        </div>
    )
}








const SpecialDishes = () => {
    const [receipes, setReceipes]=useState([])

    const slider=React.useRef(null)

    useEffect(()=>{
        fetch('/public/menu.json')
        .then(res=>res.json())
        .then(data=>{
            const special= data.filter((items)=>items.cat === "popular")
            setReceipes(special);
        })
    },[])

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ],
        nextArrow: <simpleNextArrow/>,
        preview: <simplePreviewArrow/>
      };
    return (
        <div className='section-container relative'>
            <div className='text-center mb-20'>
          <h3 className='title'>Special Dishes</h3>
          </div>
          {/* slide */}
          <div className='md:absolute right-3 top-8 mb-10 md:mr-24'>
          <button onClick={()=>slider?.current?.slickPrev()} className='bg-button btn p-2 rounded-full ml-5 hover:bg-button-hvr'><FaAngleLeft className='w-6 h-6 p-1'/></button>
             <button onClick={()=>slider?.current?.slickNext()} className='bg-button btn p-2 rounded-full ml-5 hover:bg-button-hvr'><FaAngleRight className='w-6 h-6 p-1'/></button>
            
          </div>
        <Slider ref={slider} {...settings} className='overflow-hidden mt-10 space-x-5 '>
   
                     
        {receipes?.map((res,idx)=>(
            <Card key={idx}
            res={res}/>
        ))}

      </Slider>
        </div>
    );
};

export default SpecialDishes;