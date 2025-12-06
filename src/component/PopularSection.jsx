import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";

const PopularSection = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch("https://missionscic10-eight.vercel.app/services")
        .then((res) => res.json())
        .then((data) => setServices(data))
        .catch((err) => console.log(err));
    }, []);

    console.log(services);

    return (
    <div className="mt-8 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-[145px]">
        <div>
            <h3 className="font-bold text-2xl sm:text-3xl text-center mb-8 sm:mb-12">Popular Winter Care Services</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 justify-items-center">
            {
                services.slice(0, 8).map((service) => 
                    <div key={service.serviceId} className="card bg-base-100 w-full max-w-96 shadow-sm">
                        <figure>
                            <img className="w-full h-[250px] sm:h-[300px] object-cover"
                            src={service?.image}
                            alt="Shoes"/>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-base sm:text-lg">{service?.name}</h2>
                            <div className="flex justify-between text-sm sm:text-base">
                                <p>Price: ${service?.price}</p>
                                {/* <p>Rating: {service?.rating} stars</p> */}
                                <p>Date: {service?.date} </p>
                            </div>
                            <div className="card-actions justify-end">
                                <NavLink to={`/details/${service?._id}`}> 
                                    <button className="btn btn-primary btn-sm sm:btn-md">View Details</button> 
                                </NavLink>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>

    </div>
    );
};

export default PopularSection;