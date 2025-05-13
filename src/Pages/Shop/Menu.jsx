import React, { useEffect, useState } from 'react';
import Carousol from '../../components/Carousol';
import Card from '../../components/Card';
import { FaUtensils, FaSort } from 'react-icons/fa';
import Banner from '../../components/Navbar/Banner';

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [category, setCategory] = useState([]);
    const [sortOption, setSortOption] = useState('default');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12); // Changed to 12 for better grid layout

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://sodium-cafe-mongoose.onrender.com/menu');
                const data = await response.json();
                setMenu(data);
                setFilteredItems(data);
            } catch (err) {
                console.log("error fetching data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const categories = [
        "All", "Chicken", "Noodles", "Set-menu", "Salad", "Vegetable", "Prawn",
        "Fried Rice", "Beef", "Drinks", "Ice Cream", "Soup", "Chicken-Fry",
        "Momo", "Steak", "Sea Platter", "Sea Masala", "Sea Fry", "Rice Bowl",
        "Pizza", "Pasta", "Burger", "Shawarma"
    ];

    const filterItems = (category) => {
        const filtered = category === 'All' ? menu : menu.filter((item) => item.category === category);
        setFilteredItems(filtered);
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handleSort = (option) => {
        setSortOption(option);
        let sortedItems = [...filteredItems];

        switch (option) {
            case "A-Z":
                sortedItems.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Z-A":
                sortedItems.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "low-to-high":
                sortedItems.sort((a, b) => a.price - b.price);
                break;
            case "high-to-low":
                sortedItems.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        setFilteredItems(sortedItems);
        setCurrentPage(1);
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen bg-gray-50">
          
            <div className="relative">
                <div className="">
                   <Banner/>
                </div>
              
            </div>

            {/* Menu Section */}
            <div className="container mx-auto px-4 py-16 mt-20 relative z-10">
                {/* Title */}
                 <div className='text-center mb-12'>
                <p className='text-red-500 font-medium mb-2'>Our Menu</p>
                <h3 className='text-4xl font-bold text-gray-800 relative inline-block pb-4 after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-2/3 after:h-1 after:bg-red-500'>
                  Curated Finest Dishes

                </h3>
            </div>
                

                {/* Category Filter */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-3">
                            <FaSort className="text-gray-600" />
                            <select
                                onChange={(e) => handleSort(e.target.value)}
                                value={sortOption}
                                className="select select-bordered w-full max-w-xs bg-white shadow-sm">
                                <option value="default">Default</option>
                                <option value="A-Z">Name (A-Z)</option>
                                <option value="Z-A">Name (Z-A)</option>
                                <option value="low-to-high">Price (Low to High)</option>
                                <option value="high-to-low">Price (High to Low)</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => filterItems(category)}
                                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                                    selectedCategory === category
                                        ? "bg-red-500 text-white shadow-lg scale-105"
                                        : "bg-white text-gray-700 hover:bg-red-50 border border-gray-200"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Menu Grid */}
                {loading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {currentItems.map((item, idx) => (
                                <Card key={idx} res={item} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {filteredItems.length > itemsPerPage && (
                            <div className="flex justify-center mt-12">
                                <div className="flex flex-wrap gap-2">
                                    {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => paginate(idx + 1)}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                                currentPage === idx + 1
                                                    ? "bg-red-500 text-white shadow-lg scale-105"
                                                    : "bg-white text-gray-700 hover:bg-red-50 border border-gray-200"
                                            }`}
                                        >
                                            {idx + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Menu;