import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Home, DollarSign, Users } from 'lucide-react';
import { useNavigate } from 'react-router';


const WhyAdoptSection = () => {
    const reasons = [
        {
            icon: <Heart className="w-12 h-12" />,
            title: "Save a Life",
            description: "Give a homeless pet a second chance at happiness. Every adoption saves a life and makes room for another rescue.",
            color: "from-rose-500 to-pink-500"
        },
        {
            icon: <Home className="w-12 h-12" />,
            title: "Find Your Perfect Match",
            description: "Shelters have pets of all ages, sizes, and personalities. You'll find the perfect companion for your lifestyle.",
            color: "from-blue-500 to-indigo-500"
        },
        {
            icon: <DollarSign className="w-12 h-12" />,
            title: "Cost-Effective",
            description: "Adoption fees are much lower than buying from breeders, and many pets are already vaccinated and neutered.",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: <Users className="w-12 h-12" />,
            title: "Support Ethical Practice",
            description: "Choosing adoption helps fight against puppy mills and unethical breeding practices.",
            color: "from-purple-500 to-violet-500"
        }
    ];
    const navigate = useNavigate();
    

    return (
        <div className="py-16 px-4 sm:px-8 md:px-16 lg:px-32 bg-linear-to-br from-amber-50 via-orange-50 to-rose-50 mt-10 md:mt-30">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        🐾 Why Adopt from PawMart?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Adoption isn't just about finding a pet—it's about saving a life and gaining a loyal companion. Here's why adoption is the right choice.
                    </p>
                </motion.div>

                {/* Reasons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <div className={`w-20 h-20 bg-linear-to-br ${reason.color} rounded-2xl flex items-center justify-center text-white mb-4 mx-auto`}>
                                {reason.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                                {reason.title}
                            </h3>
                            <p className="text-gray-600 text-center leading-relaxed">
                                {reason.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-linear-to-r from-orange-500 to-rose-500 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl"
                >
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Change a Life?
                    </h3>
                    <p className="text-lg md:text-xl mb-6 opacity-90">
                        Adopt, don't shop. Browse our available pets and find your new best friend today!
                    </p>
                    <button onClick={() => navigate('/services')} className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg">
                        Browse Available Pets →
                    </button>
                </motion.div>

                {/* Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                    {[
                        { number: "1000+", label: "Pets Adopted" },
                        { number: "500+", label: "Happy Families" },
                        { number: "50+", label: "Available Now" },
                        { number: "100%", label: "Love Guaranteed" }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <p className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                                {stat.number}
                            </p>
                            <p className="text-gray-600 font-medium">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyAdoptSection;