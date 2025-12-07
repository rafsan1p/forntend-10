import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdEmail, MdCalendarToday, MdAttachMoney, MdLocationOn } from 'react-icons/md';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';

const ServiceDetails = () => {
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const {user} = useContext(AuthContext);
        
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        setLoading(true);
        fetch(`https://missionscic10-eight.vercel.app/services/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setService(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
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
        const additionalNotes = form.note.value;
        const date = form.date.value;

        const formData = {
            productId: id,
            productName,
            buyerName,
            buyerEmail: buyerEmail,
            quantity,
            price,
            address,
            phone,
            additionalNotes,
            date
        }

        axios.post('https://missionscic10-eight.vercel.app/orders', formData)
            .then(res => {
                if(res.data.acknowledged){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Order Placed Successfully!',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    form.reset();
                    document.getElementById('my_modal_3').close();
                }
            })
            .catch(err => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Failed to place order',
                    text: err.message
                });
            });
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <span className="loading loading-spinner loading-lg text-primary w-20 h-20"></span>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-700">Service not found</h2>
            </div>
        );
    }
    
    return (
        <div className='min-h-[calc(100vh-200px)] bg-linear-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-6xl mx-auto'>
                <div className='bg-white rounded-3xl shadow-2xl overflow-hidden'>
                    {/* Service Image */}
                    <div className='h-[400px] md:h-[500px] overflow-hidden relative'>
                        <img 
                            className='w-full h-full object-cover' 
                            src={service?.image} 
                            alt={service?.name} 
                        />
                        {/* Category Badge Overlay */}
                        <div className='absolute top-6 left-6'>
                            <span className='bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-gray-800 shadow-lg'>
                                {service?.category}
                            </span>
                        </div>
                    </div>

                    {/* Service Content */}
                    <div className='p-8 lg:p-12'>
                        {/* Service Name */}
                        <h1 className='text-4xl lg:text-5xl font-bold text-gray-800 mb-6'>
                            {service?.name}
                        </h1>

                        {/* Description */}
                        <div className='mb-8'>
                            <h3 className='text-xl font-bold text-gray-800 mb-3'>Description</h3>
                            <p className='text-gray-600 text-lg leading-relaxed'>
                                {service?.description}
                            </p>
                        </div>

                        {/* Info Grid */}
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                            {/* Price Card */}
                            <div className='bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200'>
                                <div className='flex items-center gap-3 mb-2'>
                                    <MdAttachMoney className='w-8 h-8 text-green-600' />
                                    <p className='text-gray-600 font-semibold'>Price</p>
                                </div>
                                {service?.price === 0 ? (
                                    <div>
                                        <p className='text-3xl font-bold text-green-600'>Free</p>
                                        <p className='text-sm text-gray-500'>For Adoption</p>
                                    </div>
                                ) : (
                                    <p className='text-3xl font-bold text-green-600'>৳{service?.price}</p>
                                )}
                            </div>

                            {/* Location Card */}
                            <div className='bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200'>
                                <div className='flex items-center gap-3 mb-2'>
                                    <MdLocationOn className='w-8 h-8 text-blue-600' />
                                    <p className='text-gray-600 font-semibold'>Location</p>
                                </div>
                                <p className='text-xl font-bold text-blue-600'>{service?.location}</p>
                            </div>

                            {/* Date Card */}
                            <div className='bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200'>
                                <div className='flex items-center gap-3 mb-2'>
                                    <MdCalendarToday className='w-8 h-8 text-purple-600' />
                                    <p className='text-gray-600 font-semibold'>Available Date</p>
                                </div>
                                <p className='text-xl font-bold text-purple-600'>{service?.date}</p>
                            </div>
                        </div>

                        {/* Owner Info */}
                        <div className='bg-linear-to-r from-slate-50 to-gray-50 rounded-2xl p-6 mb-8 border-2 border-gray-200'>
                            <h3 className='text-xl font-bold text-gray-800 mb-4'>Contact Information</h3>
                            <div className='flex items-center gap-3'>
                                <MdEmail className='text-indigo-600 w-6 h-6' />
                                <p className='text-gray-700 font-medium'>{service?.email}</p>
                            </div>
                        </div>

                        {/* Action Button */}
                        <button 
                            className="w-full py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-300" 
                            onClick={()=>document.getElementById('my_modal_3').showModal()}
                        >
                            {service?.category === 'Pets' ? '🐾 Adopt Now' : '🛒 Order Now'}
                        </button>

                        {/* Order Modal */}
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box max-w-2xl">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>

                                <h3 className="font-bold text-2xl mb-6 text-center text-gray-800">
                                    {service?.category === 'Pets' ? '🐾 Adoption Form' : '🛒 Order Form'}
                                </h3>

                                <form onSubmit={handleOrder} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="label font-semibold">Product Name<span className="text-red-500">*</span></label>
                                            <input readOnly defaultValue={service?.name} type="text" name='productName' className="input input-bordered w-full" />
                                        </div>

                                        <div>
                                            <label className="label font-semibold">Your Name<span className="text-red-500">*</span></label>
                                            <input defaultValue={user?.displayName} type="text" name='buyerName' className="input input-bordered w-full" required />
                                        </div>

                                        <div>
                                            <label className="label font-semibold">Your Email<span className="text-red-500">*</span></label>
                                            <input readOnly defaultValue={user?.email} type="email" name='buyerEmail' className="input input-bordered w-full" />
                                        </div>

                                        <div>
                                            <label className="label font-semibold">Quantity<span className="text-red-500">*</span></label>
                                            <input required 
                                                type="number" 
                                                name='quantity' 
                                                defaultValue={service?.category === 'Pets' ? 1 : ''}
                                                readOnly={service?.category === 'Pets'}
                                                min="1"
                                                className="input input-bordered w-full" 
                                            
                                            />
                                        </div>

                                        <div>
                                            <label className="label font-semibold">Price<span className="text-red-500">*</span></label>
                                            <input readOnly defaultValue={service?.price} type="number" name='price' className="input input-bordered w-full" />
                                        </div>

                                        <div>
                                            <label className="label font-semibold">Pickup Date<span className="text-red-500">*</span></label>
                                            <input type="date" name='date' className="input input-bordered w-full" required />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="label font-semibold">Phone Number<span className="text-red-500">*</span></label>
                                            <input type="tel" name='phone' placeholder="01XXXXXXXXX" className="input input-bordered w-full" required />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="label font-semibold">Delivery Address<span className="text-red-500">*</span></label>
                                            <textarea name='address' rows="2" placeholder="Enter your full address" className="textarea textarea-bordered w-full" required></textarea>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="label font-semibold">Additional Notes (Optional)</label>
                                            <textarea name='note' rows="3" placeholder="Any special instructions or notes..." className="textarea textarea-bordered w-full"></textarea>
                                        </div>
                                    </div>

                                    <button type='submit' className="w-full btn bg-linear-to-r from-purple-600 to-pink-600 text-white border-none hover:from-purple-700 hover:to-pink-700 mt-4">
                                        Confirm {service?.category === 'Pets' ? 'Adoption' : 'Order'}
                                    </button>
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