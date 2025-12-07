import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategorySection = () => {
    const navigate = useNavigate();

    const categories = [
        {
            id: 1,
            name: 'Pets',
            icon: '🐶',
            title: 'Pets (Adoption)',
            description: 'Find your perfect companion',
            image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500&q=80',
            bgColor: 'from-pink-500 to-rose-500',
            count: '50+ Available'
        },
        {
            id: 2,
            name: 'Food',
            icon: '🍖',
            title: 'Pet Food',
            description: 'Nutritious meals for your pets',
            image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&q=80',
            bgColor: 'from-orange-500 to-amber-500',
            count: '100+ Products'
        },
        {
            id: 3,
            name: 'Accessories',
            icon: '🧸',
            title: 'Accessories',
            description: 'Toys, beds, and more',
            image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=500&q=80',
            bgColor: 'from-purple-500 to-indigo-500',
            count: '80+ Items'
        },
        {
            id: 4,
            name: 'Care Products',
            icon: '💊',
            title: 'Pet Care Products',
            description: 'Health & grooming essentials',
            image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80',
            bgColor: 'from-teal-500 to-cyan-500',
            count: '60+ Products'
        }
    ];

    const handleCategoryClick = (categoryName) => {
        navigate(`/services?category=${categoryName}`);
    };

    return (
        <div className="mt-12 mb-16 px-4 sm:px-8 md:px-16 lg:px-32">
            <div className="text-center mb-12">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold font-bold text-blue-500 dark:text-blue-300  tracking-tight mb-3"
                >
                    Browse by Category
                </motion.h2>
                <p className="font-bold text-blue-500 dark:text-blue-300  tracking-tight text-lg">Find exactly what you're looking for</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        onClick={() => handleCategoryClick(category.name)}
                        className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                        {/* Background Image */}
                        <div className="h-64 relative overflow-hidden">
                            <img 
                                src={category.image} 
                                alt={category.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-linear-to-t ${category.bgColor} opacity-70 group-hover:opacity-80 transition-opacity`}></div>
                        </div>

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                            <div className="text-5xl mb-3">{category.icon}</div>
                            <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                            <p className="text-sm text-white/90 mb-2">{category.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                    {category.count}
                                </span>
                                <svg 
                                    className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CategorySection;