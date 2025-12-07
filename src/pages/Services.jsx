import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { MapPin, Tag, Calendar, Heart, Filter } from "lucide-react";

const Services = () => {
    const [services, setServices] = useState([]);
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const [favorites, setFavorites] = useState(() => {
        // localStorage থেকে favorites load করা
        const saved = localStorage.getItem('petFavorites');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        const categoryFromUrl = searchParams.get('category');
        if (categoryFromUrl) {
            setCategory(categoryFromUrl);
        }
    }, [searchParams]);
    
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        setLoading(true);
        fetch(`https://missionscic10-eight.vercel.app/services?category=${category}`)
        .then((res) => res.json())
        .then((data) => {
            setServices(data);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }, [category]);

    const toggleFavorite = (serviceId) => {
        setFavorites(prev => {
            const newFavorites = {
                ...prev,
                [serviceId]: !prev[serviceId]
            };
            // localStorage এ save করা
            localStorage.setItem('petFavorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <span className="loading loading-spinner loading-lg text-primary w-20 h-20"></span>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-200px)] my-12 px-4 sm:px-8 md:px-16 lg:px-32">
            {/* Header Section */}
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-700 dark:text-blue-300 tracking-tight mb-3">
                    Pets & Available Products
                </h2>
                <p className="text-blue-600 dark:text-blue-300 font-semibold tracking-tight text-lg">Browse all available listings</p>
            </div>

            {/* Filter Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-md">
                <div className="flex items-center gap-2 text-gray-600">
                    <Filter size={20} />
                    <span className="font-semibold">Filter by Category:</span>
                </div>
                <select 
                    onChange={(e) => setCategory(e.target.value)} 
                    value={category}
                    className="select select-bordered w-full sm:w-64 bg-white"
                >
                    <option value="">All Categories</option>
                    <option value="Pets">🐶 Pets</option>
                    <option value="Food">🍖 Pet Food</option>
                    <option value="Accessories">🧸 Accessories</option>
                    <option value="Care Products">💊 Care Products</option>
                </select>
            </div>

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-gray-600">
                    Showing <span className="font-bold text-gray-800">{services.length}</span> results
                    {category && <span> in <span className="font-bold text-purple-600">{category}</span></span>}
                </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={service._id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg"
                    >
                        {/* Image Section */}
                        <div className="relative h-64 overflow-hidden">
                            <img 
                                src={service?.image} 
                                alt={service?.name}
                                className="w-full h-full object-cover"
                            />
                            {/* Category Badge */}
                            <div className="absolute top-4 left-4">
                                <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold text-gray-800">
                                    <Tag size={14} />
                                    {service?.category}
                                </span>
                            </div>
                            {/* Favorite Icon */}
                            <button 
                                onClick={() => toggleFavorite(service._id)}
                                className={`absolute top-4 right-4 backdrop-blur-sm p-2 rounded-full transition-all ${
                                    favorites[service._id] 
                                        ? 'bg-rose-500 text-white' 
                                        : 'bg-white/90 text-gray-800 hover:bg-rose-100'
                                }`}
                            >
                                <Heart 
                                    size={18} 
                                    fill={favorites[service._id] ? 'currentColor' : 'none'}
                                />
                            </button>
                        </div>

                        {/* Content Section */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1">
                                {service?.name}
                            </h3>

                            {/* Info Grid */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MapPin size={16} className="text-blue-500" />
                                    <span className="text-sm">{service?.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar size={16} className="text-green-500" />
                                    <span className="text-sm">{service?.date}</span>
                                </div>
                            </div>

                            {/* Price & Button */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div>
                                    {service?.price === 0 ? (
                                        <span className="text-2xl font-bold text-green-600">Free</span>
                                    ) : (
                                        <span className="text-2xl font-bold text-gray-800">৳{service?.price}</span>
                                    )}
                                    <p className="text-xs text-gray-500">
                                        {service?.price === 0 ? 'For Adoption' : 'Price'}
                                    </p>
                                </div>
                                <Link to={`/details/${service?._id}`}>
                                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md">
                                        See Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {services.length === 0 && (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">No listings found</h3>
                    <p className="text-gray-500">Try selecting a different category</p>
                </div>
            )}
        </div>
    );
};

export default Services;