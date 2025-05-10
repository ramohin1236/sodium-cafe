import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from './../../components/Card';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';





const menuItems =()=>{
    [
        {
          
          "name": "Chicken Chili (1.3)",
          "recipe": "Chicken Chili, place on buns with cheese, lettuce, tomato, onion, and condiments.",
          "image": "/public/chicken-1.png",
          "category": "Chicken ",
          "cat":"popular",
          "price": 349
        },
        {
          
          "name": "Chicken Green Chili (1.3)",
          "recipe": "Spread tomato sauce on Chicken Green Chili dough, add sliced mozzarella and basil leaves, bake until crust is golden.",
          "image": "/public/Chicken-2.png",
          "category": "Chicken",
          "cat":"popular",
          "price": 340
        },
        {
          
          "name": "Beef Chowmin(1.3)",
          "recipe": "Beef Chowmin lettuce with Caesar dressing, croutons, and grated Parmesan cheese.",
          "image": "/public/Noodles-1.png",
          "category": "Noodles",
          "cat":"popular",
          "price": 399
        },
        {
          
          "name": "Nasi Gurih(set-menu-10)",
          "recipe": "Cook fettuccine, sauté chicken, combine with Alfredo sauce, garnish with parsley and Parmesan.",
          "image": "/public/set-menu-1.jpe",
          "category": "Set-menu",
          "cat":"non-popular",
          "price": 249
        },
        {
          
          "name": "Chicken Cash Nut Salad(1.3)",
          "recipe": "Mix flour, cocoa powder, sugar, eggs, and chocolate chips,Nut, bake until set.",
          "image": "/public/salad-1.png",
          "category": "Salad",
          "cat":"popular",
          "price": 299
        },
        {
          
          "name": "Chinese Vegetable(1.3)",
          "recipe": "Sauté mixed vegetables with garlic, ginger, and soy sauce until tender-crisp.",
          "image": "/public/vegetable-1.png",
          "category": "Vegetable",
          "cat":"popular",
          "price": 230
        },
        {
          
          "name": "Prawn Masala",
          "recipe": "Prawn Masala fillets, serve on warmed tortillas with cabbage slaw and chipotle mayo.",
          "image": "/public/prawn-1.png",
          "category": "Prawn",
          "cat":"popular",
          "price": 380
        },
        {
          
          "name": "Egg Fried Rice(1.3)",
          "recipe": "Prawn Masala fillets, serve on warmed tortillas with cabbage slaw and chipotle mayo.",
          "image": "/public/prawn-1.png",
          "category": "Fried Rice",
          "cat":"non-popular",
          "price": 380
        },
        {
          
          "name": "Beef Masala(1.3)",
          "recipe": "Prawn Masala fillets, serve on warmed tortillas with cabbage slaw and chipotle mayo.",
          "image": "/public/prawn-1.png",
          "category": "Beef",
          "cat":"non-popular",
          "price": 380
        },
        {
          
          "name": "Black Coffee",
          "recipe": "Prawn Masala fillets, serve on warmed tortillas with cabbage slaw and chipotle mayo.",
          "image": "/public/prawn-1.png",
          "category": "Drinks",
          "cat":"non-popular",
          "price": 380
        },
        {
          
          "name": "Chocolate",
          "recipe": "Prawn Masala fillets, serve on warmed tortillas with cabbage slaw and chipotle mayo.",
          "image": "/public/prawn-1.png",
          "category": "Ice Cream",
          "cat":"non-popular",
          "price": 120
        },
        {
          
          "name": "Thai Clear Soup(1.3)",
          "recipe": "Prawn Masala fillets, serve on warmed tortillas with cabbage slaw and chipotle mayo.",
          "image": "/public/prawn-1.png",
          "category": "Soup",
          "cat":"non-popular",
          "price": 350
        },
        {
          
          "name": "Chrispy Chicken",
          "recipe": "Prawn Masala fillets, serve on warmed tortillas with cabbage slaw and chipotle mayo.",
          "image": "/public/prawn-1.png",
          "category": "Chicken-Fry",
          "cat":"non-popular",
          "price": 120
        },
        {
          
          "name": "Chicken Momo(6pcs)",
          "recipe": "Prawn Masala fillets, serve on warmed tortillas with cabbage slaw and chipotle mayo.",
          "image": "/public/prawn-1.png",
          "category": "Momo",
          "cat":"non-popular",
          "price": 180
        },
        {
          
          "name": "Chicken Steak",
          "recipe": "Prawn Masala fillets, serve on warmed tortillas with cabbage slaw and chipotle mayo.",
          "image": "/public/prawn-1.png",
          "category": "Steak",
          "cat":"non-popular",
          "price": 399
        },
        {
          
          "name": "Pompet Platter (Rice,Vegetable,Red sinaba)",
          "recipe": "Prawn Masala fillets, serve on warmed tortillas with cabbage slaw and chipotle mayo.",
          "image": "/public/prawn-1.png",
          "category": "Sea Platter",
          "cat":"non-popular",
          "price": 799
        },
        {
          
          "name": "Red Sinaba Masala",
          "recipe": "Prawn Masala fillets, serve on warmed tortillas with cabbage slaw and chipotle mayo.",
          "image": "/public/prawn-1.png",
          "category": "Sea Masala",
          "cat":"non-popular",
          "price": 699
        },
        {
          
          "name": "Pompet Fry",
          "recipe": "Prawn Masala fillets, serve on warmed tortillas with cabbage slaw and chipotle mayo.",
          "image": "/public/prawn-1.png",
          "category": "Sea Fry",
          "cat":"non-popular",
          "price": 599
        },
        {
          
          "name": "Crispy Rice Bowl",
          "recipe": "Prawn Masala fillets, serve on warmed tortillas with cabbage slaw and chipotle mayo.",
          "image": "/public/prawn-1.png",
          "category": "Rice Bowl",
          "cat":"non-popular",
          "price": 130
        },
        {
          
          "name": "Chicken Pizz",
          "recipe": "Prawn Masala fillets, serve on warmed tortillas with cabbage slaw and chipotle mayo.",
          "image": "/public/prawn-1.png",
          "category": "Pizza",
          "cat":"non-popular",
          "price": 399
        },
        {
          
          "name": "Oven Baked Pasta(1.1)",
          "recipe": "Prawn Masala fillets, serve on warmed tortillas with cabbage slaw and chipotle mayo.",
          "image": "/public/prawn-1.png",
          "category": "Pasta",
          "cat":"non-popular",
          "price": 220
        },
        {
          
          "name": "Chicken Burger(single patty)",
          "recipe": "Prawn Masala fillets, serve on warmed tortillas with cabbage slaw and chipotle mayo.",
          "image": "/public/prawn-1.png",
          "category": "Burger",
          "cat":"non-popular",
          "price": 220
        },
        {
          
          "name": "BBQ Chicken Shwarama",
          "recipe": "Prawn Masala fillets, serve on warmed tortillas with cabbage slaw and chipotle mayo.",
          "image": "/public/prawn-1.png",
          "category": "Shawarma",
          "cat":"non-popular",
          "price": 130
        }
       
      ]
} 





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
        fetch('https://sodium-cafe-mongoose.onrender.com/menu')
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