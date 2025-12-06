import React, { useContext, useState } from 'react';
import { Calendar } from 'lucide-react';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddService = () => {

    const {user} = useContext(AuthContext);
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const category = form.category.value;
        const price = parseInt(form.price.value);
        const location = form.location.value;
        const description = form.description.value;
        const image = form.image.value;
        const date = form.date.value;
        const email = form.email.value;

        const formData = {
            name,
            category,
            price,
            location,
            description,
            image,
            date,
            email
        }
        console.log(formData);
        axios.post('https://missionscic10-eight.vercel.app/services', formData)
            .then(res => {
                console.log(res);
                if(res.data.acknowledged){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Service Added Successfully',
                    });
                    form.reset();
                }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Failed to add service',
                    });
                }
            })
    }

    const isPetCategory = category === 'Pets';

    return (
        <div className="min-h-[calc(100vh-200px)] bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 py-6 sm:py-8 md:py-12 px-3 sm:px-4 lg:px-6 flex items-center justify-center">
            <div className="w-full max-w-3xl mx-auto">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-linear-to-r from-purple-600 to-pink-600 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Add New Product</h2>
                        <p className="text-purple-100 mt-1 sm:mt-2 text-sm sm:text-base">Fill in the details to list your pet or product</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6">
                        <div>
                            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1.5 sm:mb-2">
                                Product/Pet Name <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                name="name" 
                                required
                                placeholder="Enter product or pet name"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1.5 sm:mb-2">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select 
                                name="category" 
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none bg-white">
                                <option value="">Select a category</option>
                                <option value="Pets">Pets</option>
                                <option value="Food">Food</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Care Products">Care Products</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                            <div>
                                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1.5 sm:mb-2">
                                    Price <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm sm:text-base">৳</span>
                                    <input
                                        type="number"
                                        name="price"
                                        value={isPetCategory ? '0' : undefined}
                                        min="0"
                                        step="0.01"
                                        readOnly={isPetCategory}
                                        required
                                        placeholder="0.00"
                                        className={`w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none ${
                                            isPetCategory ? 'bg-gray-100 cursor-not-allowed' : ''
                                        }`}
                                    />
                                </div>
                                {isPetCategory && (
                                    <p className="text-xs sm:text-sm text-gray-500 mt-1">Price is 0 for pets</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1.5 sm:mb-2">
                                    Location <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    required
                                    placeholder="e.g., Dhaka, Bangladesh"
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1.5 sm:mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                rows="4"
                                required
                                placeholder="Provide detailed description..."
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1.5 sm:mb-2">
                                Image URL <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="url"
                                name="image"
                                required
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1.5 sm:mb-2">
                                Pickup Date <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    name="date"
                                    required
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none"
                                />
                                <Calendar className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1.5 sm:mb-2">Email</label>
                            <input 
                                value={user?.email}
                                type="email"
                                name="email"
                                readOnly
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-600"
                            />
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">This is your registered email</p>
                        </div>

                        <div className="pt-2 sm:pt-3 md:pt-4">
                            <button
                                type="submit"
                                className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 sm:py-3.5 md:py-4 text-sm sm:text-base rounded-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition duration-200 shadow-lg hover:shadow-xl">
                                Submit Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddService;