import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MapPin, Tag, Calendar, Heart } from "lucide-react";

const PopularSection = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState(() => {
        // localStorage থেকে favorites load করা
        const saved = localStorage.getItem('petFavorites');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        fetch("https://missionscic10-eight.vercel.app/services")
        .then((res) => res.json())
        .then((data) => {
            setServices(data);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }, []);

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
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="loading loading-spinner loading-lg text-primary w-16 h-16"></span>
            </div>
        );
    }

    return (
        <div className="mt-16 mb-20 px-4 sm:px-8 md:px-16 lg:px-32">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-700 dark:text-blue-300 tracking-tight mb-3">
                    Popular Services
                </h2>
                <p className="font-bold text-blue-700 dark:text-blue-300 tracking-tight text-lg">Latest pets and products available for adoption</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {services.slice(0, 8).map((service) => (
                    <div
                        key={service._id}
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
                                <NavLink to={`/details/${service?._id}`}>
                                    <button className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md">
                                        See Details
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
                <NavLink to="/services">
                    <button className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg">
                        View All Listings →
                    </button>
                </NavLink>
            </div>
        </div>
    );
};

export default PopularSection;