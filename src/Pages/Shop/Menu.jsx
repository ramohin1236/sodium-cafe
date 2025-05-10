import React, { useEffect, useState } from 'react'
import Carousol from '../../components/Carousol'
import Card from '../../components/Card'

const Menu = () => {
    const [menu, setMenu] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [category, setCategory] = useState([])
    const [sortOptin, setSortOption] = useState('default')

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(10)

    useEffect(() => {
        const fetchtData = async () => {
            try {
                const response = await fetch('https://sodium-cafe-mongoose.onrender.com/menu')
                const data = await response.json()

                setMenu(data)
                setFilteredItems(data)
            }
            catch (err) {
                console.log("error for fetching data", err);
            }
        }

        fetchtData()
    }, [])
    useEffect(() => {
        const fetchtData = async () => {
            try {
                const response = await fetch('/Category.json')
                const data = await response.json()
                setCategory(data);

            }
            catch (err) {
                console.log("error for fetching data", err);
            }
        }

        fetchtData()
    }, [])


    const filterItems = (category) => {
        const filtered = category === 'All' ? menu : menu.filter((item) => item.category === category);
        setFilteredItems(filtered);
        setSelectedCategory(category);
        setCurrentPage(1)
    }
    // show all data

    const showAll = () => {
        setFilteredItems(menu)
        setSelectedCategory("All")
        setCurrentPage(1)
    }

    //  soting Data

    const handelSort = (option) => {
        setSortOption(option)

        let sortedItems = [...filteredItems];

        //  logic
        switch (option) {
            case "A-Z":
                sortedItems.sort((a, b) => a.name.localeCompare(b.name))
                break;
            case "Z-A":
                sortedItems.sort((a, b) => b.name.localeCompare(a.name))
                break;
            case "low-to-high":
                sortedItems.sort((a, b) => a.price - b.price)
                break;
            case "high-to-low":
                sortedItems.sort((a, b) => b.price - a.price)
                break;

            default:
                break;

        }

        setFilteredItems(sortedItems)
        setCurrentPage(1)
    }

    // pagination

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div>
            {/* carousel */}
            <div className='mt-20'>
                <Carousol />
            </div>

            <div className='section-container  bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100% '>
                {/* filtering and sorting */}
                <div>
                    {/* all buttons */}
                    <div>
                        <p className='text-3xl font-bold mt-12 mb-4'>Category Here</p>
                        <div className="pt-4  items-center flex     overflow-x-auto  gap-7 mb-4 ">
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "All" ? "activee" : ""}`} onClick={showAll}>All</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Chicken" ? "activee" : ""}`} onClick={() => filterItems("Chicken")}>Chicken</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Noodles" ? "activee" : ""}`} onClick={() => filterItems("Noodles")}>Noodles</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Set-menu" ? "activee" : ""}`} onClick={() => filterItems("Set-menu")}>Set-menu</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Salad" ? "activee" : ""}`} onClick={() => filterItems("Salad")}>Salad</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Vegetable" ? "activee" : ""}`} onClick={() => filterItems("Vegetable")}>Vegetable</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Prawn" ? "activee" : ""}`} onClick={() => filterItems("Prawn")}>Prawn</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Fried Rice" ? "activee" : ""}`} onClick={() => filterItems("Fried Rice")}>Fried Rice</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Beef" ? "activee" : ""}`} onClick={() => filterItems("Beef")}>Beef</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Drinks" ? "activee" : ""}`} onClick={() => filterItems("Drinks")}>Drinks</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Ice Cream" ? "activee" : ""}`} onClick={() => filterItems("Ice Cream")}>Ice Cream</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Soup" ? "activee" : ""}`} onClick={() => filterItems("Soup")}>Soup</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Chicken-Fry" ? "activee" : ""}`} onClick={() => filterItems("Chicken-Fry")}>Chicken-Fry</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Momo" ? "activee" : ""}`} onClick={() => filterItems("Momo")}>Momo</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Steak" ? "activee" : ""}`} onClick={() => filterItems("Steak")}>Steak</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Sea Platter" ? "activee" : ""}`} onClick={() => filterItems("Sea Platter")}>Sea Platter</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Sea Masala" ? "activee" : ""}`} onClick={() => filterItems("Sea Masala")}>Sea Masala</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Sea Fry" ? "activee" : ""}`} onClick={() => filterItems("Sea Fry")}>Sea Fry</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Rice Bowl" ? "activee" : ""}`} onClick={() => filterItems("Rice Bowl")}>Rice Bowl</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Pizza" ? "activee" : ""}`} onClick={() => filterItems("Pizza")}>Pizza</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Pasta" ? "activee" : ""}`} onClick={() => filterItems("Pasta")}>Pasta</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Burger" ? "activee" : ""}`} onClick={() => filterItems("Burger")}>Burger</button>
                            <button className={`border-x-4  font-bold hover:bg-button hover:text-white border-button rounded-2xl mx-8 px-8 py-2 ${selectedCategory === "Shawarma" ? "activee" : ""}`} onClick={() => filterItems("Shawarma")}>Shawarma</button>

                        </div>
                    </div>
                </div>
                {/* sort */}
                <div className=''>
                    <p className='text-3xl font-bold my-3 flex justify-end mr-20'>Sort Items</p>
                    <div className='flex justify-end'>
                        <select
                            onChange={(e) => handelSort(e.target.value)}
                            value={sortOptin}
                            className="select select-secondary w-full max-w-xs">
                            <option value="default" className='text-xl font-bold' selected>Defalut</option>
                            <option value="A-Z" className='text-xl font-bold'>A-Z</option>
                            <option value="Z-A" className='text-xl font-bold'>Z-A</option>
                            <option value="low-to-high" className='text-xl font-bold'>Price-Low-to-High</option>
                            <option value="high-to-low" className='text-xl font-bold'>Price-High-to-Low</option>

                        </select>
                    </div>
                </div>
                {/* product cart */}
                <div className='grid  grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-12 mt-12'>
                    {
                        currentItems.map((res, idx) => (
                            <Card key={idx} res={res} />
                        ))
                    }
                </div>


            </div>

            {/* pagination */}
            <div className='flex justify-center mt-6 gap-3'>
                {
                    Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, idx) => (
                        <button
                            className={`mx-1 px-3 py-1 rounded-full ${currentPage === idx + 1 ? "bg-button text-white text-2xl font-bold" : "font-bold text-2xl bg-gray-300"}`}
                            onClick={() => paginate(idx + 1)}
                            key={idx + 1}>
                            {idx + 1}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default Menu