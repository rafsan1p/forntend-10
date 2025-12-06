import React, { useContext, useEffect, useState } from "react";
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
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <span className="loading loading-spinner loading-lg text-primary w-24 h-24"></span>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-200px)] shadow-xl p-4 sm:p-6 md:p-10 lg:p-14 space-y-4 sm:space-y-6">
      <p className="font-bold text-xl sm:text-2xl">My Services</p>

      {myServices.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500">No services found!</p>
        </div>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myServices.map((service) => (
                  <tr key={service._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={service?.image} alt="Service" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{service?.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="line-clamp-2">{service?.description}</p>
                    </td>
                    <td>{service?.price}$</td>
                    <td className="flex gap-3">
                      <button
                        onClick={() => handleDelete(service?._id)}
                        className="btn btn-error btn-xs"
                      >
                        Delete
                      </button>
                      <Link to={`/update-services/${service?._id}`}>
                        <button className="btn btn-primary btn-xs">Edit</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            {myServices.map((service) => (
              <div
                key={service._id}
                className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200"
              >
                <div className="flex items-start gap-3">
                  <div className="avatar shrink-0">
                    <div className="mask mask-squircle h-16 w-16">
                      <img src={service?.image} alt="Service" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base sm:text-lg truncate">
                      {service?.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                      {service?.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="font-semibold text-lg text-purple-600">
                    {service?.price}$
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(service?._id)}
                      className="btn btn-error btn-sm text-xs"
                    >
                      Delete
                    </button>
                    <Link to={`/update-services/${service?._id}`}>
                      <button className="btn btn-primary btn-sm text-xs">
                        Edit
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyServices;