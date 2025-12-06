import React from 'react';
import { FaSnowflake } from 'react-icons/fa';
import { GiPawHeart } from 'react-icons/gi';
import { PiCoatHangerFill } from 'react-icons/pi';
import { IoWater } from 'react-icons/io5';

const WinterCareTips = () => {
  const tips = [
    {
      id: 1,
      icon: <FaSnowflake className="text-5xl text-blue-500" />,
      title: "Keep Your Pet Warm Indoors",
      description: "As temperatures drop, ensure your pet stays cozy indoors. Provide soft blankets, warm bedding, and avoid exposing them to cold floors for long periods."
    },
    {
      id: 2,
      icon: <GiPawHeart className="text-5xl text-gray-700" />,
      title: "Moisturize Paws Regularly",
      description: "Cold weather can cause cracked paws. Apply pet-safe balms to keep them moisturized and prevent irritation from snow, salt, or ice."
    },
    {
      id: 3,
      icon: <PiCoatHangerFill className="text-5xl text-orange-400" />,
      title: "Limit Outdoor Time",
      description: "Shorter walks during extreme cold will reduce the risk of hypothermia, frostbite, and discomfort in your pets. Stay alert to their body language."
    },
    {
      id: 4,
      icon: <IoWater className="text-5xl text-blue-400" />,
      title: "Hydrate & Maintain Nutrition",
      description: "Pets lose moisture faster in winter. Make sure water bowls stay full, and feed a balanced diet to support warmth and immunity."
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Winter Care Tips for Pets
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip) => (
            <div 
              key={tip.id} 
              className="card bg-base-100 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="card-body">
                <div className="mb-4">
                  {tip.icon}
                </div>
                <h3 className="card-title text-primary text-lg mb-2">
                  {tip.title}
                </h3>
                <p className="text-sm text-gray-600 text-left">
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WinterCareTips;