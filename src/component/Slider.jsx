import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router';

import 'swiper/css';
import 'swiper/css/navigation';
import i1 from '../assets/1.jpg';
import i2 from '../assets/2.jpg';
import i3 from '../assets/3.jpg';

const Slider = () => {
  const slides = [
    {
      image: i1,
      tagline: "Find Your Furry Friend Today!",
      description: "Browse through our adorable pets waiting for a loving home"
    },
    {
      image: i2,
      tagline: "Adopt, Don't Shop — Give a Pet a Home.",
      description: "Make a difference in a pet's life by choosing adoption"
    },
    {
      image: i3,
      tagline: "Because Every Pet Deserves Love and Care.",
      description: "Join our community of caring pet lovers and owners"
    }
  ];

  return (
    <div className="relative">
      <Swiper 
        navigation={true} 
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Navigation, Autoplay]} 
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img 
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] object-cover" 
                src={slide.image} 
                alt={`Slide ${index + 1}`} 
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent"></div>
              
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 sm:px-8 md:px-16">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 drop-shadow-2xl">
                  {slide.tagline}
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-2xl drop-shadow-2xl mb-4 sm:mb-6">
                  {slide.description}
                </p>
                <Link to="/services">
                  <button className="btn btn-primary mt-2 sm:mt-4">
                    Explore Now
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;