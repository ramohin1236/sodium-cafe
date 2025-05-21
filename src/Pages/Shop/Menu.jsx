import React, { useEffect, useState } from 'react';
import Carousol from '../../components/Carousol';
import Card from '../../components/Card';
import { FaUtensils, FaSort } from 'react-icons/fa';
import Banner from '../../components/Navbar/Banner';
import MenuBanner from '../../components/MenuBanner/MenuBanner';

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [category, setCategory] = useState([]);
    const [sortOption, setSortOption] = useState('default');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);

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
            <MenuBanner />
            
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
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => filterItems(cat)}
                            className={`px-4 py-2 rounded-full transition-all duration-200 ${
                                selectedCategory === cat 
                                    ? 'bg-red-500 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Sort Options */}
                <div className="flex justify-end mb-8">
                    <select
                        value={sortOption}
                        onChange={(e) => handleSort(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500"
                    >
                        <option value="default">Sort by</option>
                        <option value="A-Z">Name (A-Z)</option>
                        <option value="Z-A">Name (Z-A)</option>
                        <option value="low-to-high">Price (Low to High)</option>
                        <option value="high-to-low">Price (High to Low)</option>
                    </select>
                </div>

                {/* Menu Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <FaUtensils className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-xl font-semibold text-gray-900">
                                No items found in this category
                            </h3>
                            <p className="mt-1 text-gray-500">
                                {selectedCategory === 'all' 
                                    ? 'No items available at the moment' 
                                    : `No items found in the ${selectedCategory} category`}
                            </p>
                        </div>
                    ) : (
                        currentItems.map((item) => (
                            <Card key={item._id} res={item} />
                        ))
                    )}
                </div>

                {/* Pagination */}
                {filteredItems.length > itemsPerPage && (
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-md mr-2 ${
                                currentPage === 1 
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                    : 'bg-red-500 text-white hover:bg-red-600'
                            }`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={indexOfLastItem >= filteredItems.length}
                            className={`px-4 py-2 rounded-md ${
                                indexOfLastItem >= filteredItems.length 
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                    : 'bg-red-500 text-white hover:bg-red-600'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;