import React, { useContext, useLayoutEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.config';

const Profile = () => {
    const {setUser, user} = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.displayName || '',
        photoUrl: user?.photoURL || ''
    });
    
    useLayoutEffect(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, []);

    const handleOpenForm = () => {
        setIsOpen(!isOpen);
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleUpdate = () => {
        updateProfile(auth.currentUser, {
            displayName: formData.name,
            photoURL: formData.photoUrl
        }).then(() => {
            setUser({...user, photoURL: formData.photoUrl, displayName: formData.name});
            setIsOpen(false);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className='min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-4xl mx-auto'>
                {/* Profile Card */}
                <div className='bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden'>
                    {/* Header Background */}
                    <div className='h-28 sm:h-40 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600 relative'>
                        <div className='absolute inset-0 bg-black/10'></div>
                    </div>
                    
                    {/* Profile Content */}
                    <div className='relative px-4 sm:px-8 pb-6 sm:pb-8'>
                        {/* Avatar */}
                        <div className='flex justify-center -mt-14 sm:-mt-20 mb-3 sm:mb-4'>
                            <div className='relative'>
                                <div className='w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 sm:border-8 border-white shadow-xl overflow-hidden bg-linear-to-br from-blue-400 to-purple-500'>
                                    <img 
                                        src={user?.photoURL} 
                                        alt={user?.displayName}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <div className='absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 sm:border-4 border-white'></div>
                            </div>
                        </div>

                        {/* User Info */}
                        <div className='text-center mb-4 sm:mb-6'>
                            <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>{user?.displayName}</h1>
                            <p className='text-sm sm:text-base text-gray-500 flex items-center justify-center gap-2'>
                                <svg className='w-4 h-4 sm:w-5 sm:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                                </svg>
                                <span className='break-all'>{user?.email}</span>
                            </p>
                        </div>

                        {/* Update Button */}
                        <div className='flex justify-center mb-4 sm:mb-6'>
                            <button 
                                onClick={handleOpenForm} 
                                className='px-6 sm:px-8 py-2.5 sm:py-3 bg-linear-to-r from-blue-500 to-indigo-600 text-white text-sm sm:text-base font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2'>
                                <svg className='w-4 h-4 sm:w-5 sm:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                                </svg>
                                {isOpen ? 'Cancel' : 'Update Profile'}
                            </button>
                        </div>

                        {/* Update Form */}
                        {isOpen && (
                            <div className='mt-6 sm:mt-8 bg-linear-to-br from-gray-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-inner'>
                                <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2'>
                                    <svg className='w-5 h-5 sm:w-6 sm:h-6 text-indigo-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                    </svg>
                                    Edit Profile Information
                                </h2>
                                <div className="space-y-4 sm:space-y-6">
                                    {/* Name Field */}
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                        <input 
                                            name='name' 
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            type="text"
                                            placeholder="Enter your full name"
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"/>
                                    </div>

                                    {/* Photo URL Field */}
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Photo URL</label>
                                        <input 
                                            name='photoUrl' 
                                            value={formData.photoUrl}
                                            onChange={handleInputChange}
                                            type="text"
                                            placeholder="https://example.com/photo.jpg"
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"/>
                                    </div>

                                    {/* Submit Button */}
                                    <button 
                                        onClick={handleUpdate}
                                        className="w-full py-3 sm:py-4 text-sm sm:text-base bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                                        <svg className='w-4 h-4 sm:w-5 sm:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                                        </svg>
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;