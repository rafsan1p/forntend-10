import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { MdEmail, MdStar, MdCalendarToday, MdAttachMoney } from 'react-icons/md';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';

const ServiceDetails = () => {
    const [service, setService] = useState([]);
    const {id} = useParams();
    const {user} = useContext(AuthContext);
        
    useEffect(() => {
        fetch(`https://missionscic10-eight.vercel.app/services/${id}`)
            .then((res) => res.json())
            .then((data) => setService(data))
            .catch((err) => console.log(err));
    }, [id]);

    const handleOrder = (e) => {
        e.preventDefault();
        const form = e.target;
        const productName = form.productName.value;
        const buyerName = form.buyerName.value;
        const buyerEmail = form.buyerEmail.value;
        const quantity = parseInt(form.quantity.value);
        const price = parseInt(form.price.value);
        const address = form.address.value;
        const phone = form.phone.value;
        const note = form.note.value;

        const formData = {
            productId:id,
            productName,
            buyerName,
            buyerEmail,
            quantity,
            price,
            address,
            phone,
            note,
            date: new Date()
        }

        axios.post('https://missionscic10-eight.vercel.app/orders', formData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    
    
    return (
        <div className='min-h-[calc(100vh-200px)] bg-linear-to-br from-slate-50 to-blue-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-5xl mx-auto'>
                <div className='bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden'>
                    {/* Service Image */}
                    <div className='h-[250px] sm:h-[350px] md:h-[400px] overflow-hidden'>
                        <img 
                            className='w-full h-full object-cover hover:scale-105 transition-transform duration-500' 
                            src={service?.image} 
                            alt={service?.serviceName} 
                        />
                    </div>

                    {/* Service Content */}
                    <div className='p-4 sm:p-6 lg:p-8'>
                        {/* Category Badge */}
                        <span className='inline-block px-3 sm:px-4 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4'>
                            {service?.category}
                        </span>

                        {/* Service Name */}
                        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4'>
                            {service?.name}
                        </h1>

                        {/* Description */}
                        <p className='text-gray-600 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed'>
                            {service?.description}
                        </p>

                        {/* Provider Info Card */}
                        <div className='bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6'>
                            <h3 className='text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3'>Service Provider</h3>
                            <div className='space-y-2'>
                                <p className='text-sm sm:text-base text-gray-700 font-semibold'>{service?.providerName}</p>
                                <p className='text-sm sm:text-base text-gray-600 flex items-center gap-2'>
                                    <MdEmail className='text-indigo-600' />
                                    {service?.email}
                                </p>
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8'>
                            {/* Price */}
                            <div className='bg-green-50 rounded-xl p-4 text-center'>
                                <MdAttachMoney className='w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-2' />
                                <p className='text-gray-600 text-xs sm:text-sm mb-1'>Price</p>
                                <p className='text-xl sm:text-2xl font-bold text-green-600'>${service?.price}</p>
                            </div>

                            {/* Rating */}
                            <div className='bg-yellow-50 rounded-xl p-4 text-center'>
                                <MdStar className='w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 mx-auto mb-2' />
                                <p className='text-gray-600 text-xs sm:text-sm mb-1'>Rating</p>
                                <p className='text-xl sm:text-2xl font-bold text-yellow-600'>{service?.rating} ★</p>
                            </div>

                            {/* Slots */}
                            <div className='bg-blue-50 rounded-xl p-4 text-center'>
                                <MdCalendarToday className='w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2' />
                                <p className='text-gray-600 text-xs sm:text-sm mb-1'>Available Slots</p>
                                <p className='text-xl sm:text-2xl font-bold text-blue-600'>{service?.slotsAvailable}</p>
                            </div>
                        </div>

                        {/* Book Button */}
                        {/* <button className='w-full py-3 sm:py-4 bg-linear-to-r from-blue-500 to-indigo-600 text-white font-bold text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300'>
                            Book This Service
                        </button> */}

                        <button className="w-full py-3 sm:py-4 bg-linear-to-r from-blue-500 to-indigo-600 text-white font-bold text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300" onClick={()=>document.getElementById('my_modal_3').showModal()}>Adapt/Order</button>

                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>

                                <form onSubmit={handleOrder} className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 mt-4">
                                    <legend className="fieldset-legend text-2xl text-bold">Order details</legend>

                                    <label className="label text-base text-bold">Product Name</label>
                                    <input readOnly defaultValue={service?.name} type="text" name='productName' className="input" placeholder="Product Name" />

                                    <label className="label text-base text-bold">Buyer Name</label>
                                    <input defaultValue={user?.displayName} type="text" name='buyerName' className="input" placeholder="Buyer Name" />

                                    <label className="label text-base text-bold">Buyer Email</label>
                                    <input readOnly defaultValue={user?.email} type="email" name='buyerEmail' className="input" placeholder="Buyer Email" />

                                    <label className="label text-base text-bold">Quantity</label>
                                    <input required type="number" name='quantity' className="input" placeholder="Quantity" />

                                    <label className="label text-base text-bold">Price</label>
                                    <input readOnly defaultValue={service?.price} type="number" name='price' className="input" placeholder="Price" />

                                    <label className="label text-base text-bold">Address</label>
                                    <input required type="text" name='address' className="input" placeholder="Address" />

                                    <label className="label text-base text-bold">Phone</label>
                                    <input required type="text" name='phone' className="input" placeholder="Phone" />

                                    <label className="label text-base text-bold">Additional Note</label>
                                    <textarea type="text" name='note' className="input" placeholder="Additional Note" />

                                    <button type='submit' className="btn btn-primary mt-3 rounded-base">Order</button>
                                </form>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;

