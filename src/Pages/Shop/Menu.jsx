import React, { useEffect, useState } from 'react'
import Carousol from '../../components/Carousol'
import Card from '../../components/Card'

const Menu = () => {
    const [menu,setMenu]=useState([])
    const [filteredItems, setFilteredItems]=useState([])
 
    const [selectedCategory, setSelectedCategory]=useState('all')
    const [category, setCategory]=useState([])
    const [sortOptin, setSortOption]=useState('default')

   

    useEffect(()=>{
        const fetchtData= async()=>{
            try{
                const response = await fetch('/menu.json')
                const data= await response.json()
                console.log(data);
                setMenu(data)
                setFilteredItems(data)
            }
            catch(err){
                console.log("error for fetching data",err);
            }
        }

        fetchtData()
    },[])
    useEffect(()=>{
        const fetchtData= async()=>{
            try{
                const response = await fetch('/Category.json')
                const data= await response.json()
                setCategory(data);
            
            }
            catch(err){
                console.log("error for fetching data",err);
            }
        }

        fetchtData()
    },[])


    const filterItems = (category) => {
        const filtered = category === 'All' ? menu : menu.filter((item) => item.category === category);
        setFilteredItems(filtered);
        setSelectedCategory(category);
    }
// show all data

     const showAll =()=>{
        setFilteredItems(menu)
        setSelectedCategory("All")
     }

    //  soting Data

    const handelSort =(option)=>{
         setSortOption(option)

         let sortedItems= [...filterItems];

        //  logic
        switch(option){
            case "A-Z":
                sortedItems.sort((a,b)=>a.name.localeCompare(b.name))
                break;
            case "Z-A":
                sortedItems.sort((a,b)=>b.name.localeCompare(a.name))
                break;
            case "low-to-high":
                sortedItems.sort((a,b)=>a.price -b.price)
                break;
            case "high-to-low":
                sortedItems.sort((a,b)=>b.price -a.price)
                break;

                default:
                    break;

        }

        setFilteredItems(sortedItems)
    }

  return (
    <div >
        {/* carousel */}
        <div className='mt-20'>
        <Carousol/>
        </div>

        <div className='section-container  bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100% '>
              {/* filtering and sorting */}
              <div>
                 <div>
                    <p className='text-3xl font-bold mt-12 mb-4'>Category Here</p>
                      <div className="pt-4 flex items-center  justify-between overflow-x-auto  gap-7 mb-4 ">
                          {category.map((item,idx)=>(
                            <div key={idx}>
                                 <p className='border-x-4 border-button hover:bg-button cursor-pointer hover:text-white font-bold  w-24 h-12 text-center items-center flex justify-center rounded-3xl '>{item.category}</p>
                            </div>
                          ))}
                      </div>
                 </div>
              </div>
              {/* product cart */}
              <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-12'>
                  {
                    filteredItems.map((res,idx)=>(
                        <Card key={idx} res={res}/>
                    ))
                  }
              </div>


        </div>
       
    </div>
  )
}

export default Menu