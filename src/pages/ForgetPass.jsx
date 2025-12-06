import { sendPasswordResetEmail } from 'firebase/auth';
import React from 'react';
import { useParams } from 'react-router';
import auth from '../firebase/firebase.config';

const ForgetPass = () => {

    const {email} = useParams();

    const handleSubmit =(e) => {
        e.preventDefault();
        const formEmail = e.target.email.value;
        sendPasswordResetEmail(auth, formEmail)
            .then(() => {
                window.open('https://mail.google.com/mail/u/0/');
            })
        .catch((error) => {
            console.log(error);
        });
    }
    return (
        <div className='min-h-[calc(100vh-200px)] bg-white rounded-2xl shadow-xl p-8 space-y-6 flex justify-center items-center'>
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input defaultValue={email} name='email'
                        type="email"
                        placeholder="Enter your email"
                        className="input input-bordered w-full px-4 py-3 rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all mb-3"/>
                    <button type="submit" className="btn btn-primary w-full py-3 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"> Send Mail</button>
                </div>
            </form>
        </div>
    );
};

export default ForgetPass;