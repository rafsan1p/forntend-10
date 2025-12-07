import React from 'react';
import { motion } from 'framer-motion';
import { Award, MapPin } from 'lucide-react';

const PetHeroesSection = () => {
    const heroes = [
        {
            id: 1,
            name: "Dr. Sarah Rahman",
            role: "Veterinary Specialist",
            location: "Dhaka, Bangladesh",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
            petsHelped: "500+",
            description: "Dedicated veterinarian with 10+ years of experience in animal care and rescue operations.",
            specialty: "Emergency Care & Surgery"
        },
        {
            id: 2,
            name: "Ahmed Karim",
            role: "Pet Adoption Coordinator",
            location: "Chittagong, Bangladesh",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
            petsHelped: "800+",
            description: "Passionate about matching pets with their forever homes. Founded Bangladesh's first pet adoption network.",
            specialty: "Adoption & Fostering"
        },
        {
            id: 3,
            name: "Nusrat Jahan",
            role: "Animal Behaviorist",
            location: "Sylhet, Bangladesh",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
            petsHelped: "350+",
            description: "Specializes in training and rehabilitation of rescued animals with behavioral challenges.",
            specialty: "Behavioral Training"
        },
        {
            id: 4,
            name: "Rafiq Hossain",
            role: "Animal Rescue Volunteer",
            location: "Rajshahi, Bangladesh",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
            petsHelped: "600+",
            description: "Full-time rescue volunteer working day and night to save stray and abandoned animals.",
            specialty: "Street Animal Rescue"
        }
    ];

    return (
        <div className="py-16 px-4 sm:px-8 md:px-16 lg:px-32 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 mt-10 md:mt-30">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        🐕 Meet Our Pet Heroes
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        The dedicated individuals behind PawMart who work tirelessly to rescue, care for, and find homes for animals in need.
                    </p>
                </motion.div>

                {/* Heroes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {heroes.map((hero, index) => (
                        <motion.div
                            key={hero.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <img 
                                    src={hero.image} 
                                    alt={hero.name}
                                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                                />
                                {/* Badge */}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                                    <Award className="w-4 h-4 text-yellow-500" />
                                    <span className="text-sm font-bold text-gray-800">{hero.petsHelped}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-1">
                                    {hero.name}
                                </h3>
                                <p className="text-purple-600 font-semibold mb-2">
                                    {hero.role}
                                </p>
                                <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                                    <MapPin className="w-4 h-4" />
                                    <span>{hero.location}</span>
                                </div>
                                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                    {hero.description}
                                </p>
                                <div className="bg-linear-to-r from-purple-50 to-pink-50 rounded-lg p-3">
                                    <p className="text-xs text-gray-500 mb-1">Specialty</p>
                                    <p className="text-sm font-semibold text-purple-700">
                                        {hero.specialty}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center bg-white rounded-3xl p-8 md:p-12 shadow-xl"
                >
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Want to Become a Pet Hero?
                    </h3>
                    <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                        Join our community of volunteers, foster parents, and caregivers making a difference in animals' lives every day.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                            Become a Volunteer
                        </button>
                        <button className="bg-white border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-xl font-bold hover:bg-purple-50 transform hover:scale-105 transition-all duration-200">
                            Foster a Pet
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PetHeroesSection;