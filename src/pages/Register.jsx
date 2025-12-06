import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.config';

const Register = () => {
    const {registerWithEmailPassword, setUser, user, handleGoogleSignin} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;
        const name = e.target.name.value;
        const photoUrl = e.target.photoUrl.value;

        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;

        if(pass.length < 6){
            return alert("Password must be at least 6 characters long.");
        }
        if(!uppercase.test(pass)){
            return alert("Password must contain at least one uppercase letter.");
        }
        if(!lowercase.test(pass)){
            return alert("Password must contain at least one lowercase letter.");
        }

        registerWithEmailPassword(email, pass)
            .then((userCredential) => {
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: photoUrl
                }).then(() => {
                    setUser(userCredential.user);
                    navigate(location.state? location.state : '/');
                }).catch((error) => {
                    console.log(error);
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
    console.log(user);

    const googleSignup = () => {
        handleGoogleSignin()
        .then((result) => {
            const user = result.user;
            setUser(user);
            navigate(location.state? location.state : '/');
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-gray-600">
                        Sign in to access your pet care account
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input name='email'
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full px-4 py-3 rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>

                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name
                            </label>
                            <input name='name'
                                type="text"
                                placeholder="Your Full Name"
                                className="input input-bordered w-full px-4 py-3 rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>

                        {/* Photo Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                PhotoURL
                            </label>
                            <input name='photoUrl'
                                type="text"
                                placeholder="Enter your photoURL"
                                className="input input-bordered w-full px-4 py-3 rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input name='password'
                                type="password"
                                placeholder="Enter your password"
                                className="input input-bordered w-full px-4 py-3 rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>


                        {/* Login Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full py-3 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            Register
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    {/* Google Signup - Full Width */}
                    <button onClick={googleSignup} className="btn btn-outline hover:bg-gray-50 w-full rounded-lg py-3 flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#4285F4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#34A853" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span>Continue with Google</span>
                    </button>


                    {/* Register Link */}
                    <div className="text-center">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-primary hover:text-primary/80 transition-colors"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;