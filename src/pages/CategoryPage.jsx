import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { MapPin, Tag, Calendar, Heart, ArrowLeft } from "lucide-react";

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setLoading(true);

        const url = `https://missionscic10-eight.vercel.app/services?category=${categoryName}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setServices(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [categoryName]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <span className="loading loading-spinner loading-lg text-primary w-20 h-20"></span>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-200px)] my-12 px-4 sm:px-8 md:px-16 lg:px-32">
            {/* Back Button */}
            <button 
                onClick={() => navigate(-1)} 
                className="flex items-center gap-2 mb-6 text-blue-600 font-semibold hover:text-blue-800"
            >
                <ArrowLeft size={20} /> Back
            </button>

            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-300 tracking-tight mb-3">
                    {categoryName} Listings
                </h2>
                <p className="text-blue-600 dark:text-blue-300 font-semibold tracking-tight text-lg">
                    Browse all available {categoryName.toLowerCase()} listings
                </p>
            </div>

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-gray-600">
                    Showing <span className="font-bold text-gray-800">{services.length}</span> results
                    {categoryName && <span> in <span className="font-bold text-purple-600">{categoryName}</span></span>}
                </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={service._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        whileHover={{ y: -8 }}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                    >
                        <div className="relative h-64 overflow-hidden">
                            <img 
                                src={service?.image} 
                                alt={service?.name}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold text-gray-800">
                                    <Tag size={14} />
                                    {service?.category}
                                </span>
                            </div>
                            <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-rose-500 hover:text-white transition-colors">
                                <Heart size={18} />
                            </button>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1">
                                {service?.name}
                            </h3>

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
                                    <button className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-md">
                                        See Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

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

export default CategoryPage;
