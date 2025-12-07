import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const MyServices = () => {
  const [myServices, setMyServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://missionscic10-eight.vercel.app/my-services?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMyServices(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user?.email]);

  useLayoutEffect(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://missionscic10-eight.vercel.app/delete/${id}`)
          .then((res) => {
            if (res.data.deletedCount == 1) {
              const filterData = myServices.filter((service) => service._id != id);
              setMyServices(filterData);

              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary w-16 h-16 sm:w-20 sm:h-20"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-2 sm:p-4 md:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-base-100 shadow-xl rounded-lg p-4 sm:p-6 md:p-8">
          <div className="mb-6">
            <h2 className="font-bold text-xl sm:text-2xl md:text-3xl">My Services</h2>
            <p className="text-sm text-gray-500 mt-1">Manage your listed services</p>
          </div>

          {myServices.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-lg sm:text-xl text-gray-500">No services found!</p>
              <p className="text-sm text-gray-400 mt-2">Start by adding your first service</p>
              <Link to="/add-services">
                <button className="btn btn-primary mt-4">Add Service</button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {myServices.map((service) => (
                <div
                  key={service._id}
                  className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <figure className="px-4 pt-4">
                    <img
                      src={service?.image}
                      alt={service?.name}
                      className="rounded-xl h-48 w-full object-cover"
                    />
                  </figure>
                  <div className="card-body p-4">
                    <h2 className="card-title text-base sm:text-lg">
                      {service?.name}
                      <div className="badge badge-secondary">${service?.price}</div>
                    </h2>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {service?.description}
                    </p>
                    <div className="card-actions justify-end mt-4">
                      <button
                        onClick={() => handleDelete(service?._id)}
                        className="btn btn-error btn-sm"
                      >
                        🗑️ Delete
                      </button>
                      <Link to={`/update-services/${service?._id}`}>
                        <button className="btn btn-primary btn-sm">
                          ✏️ Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyServices;