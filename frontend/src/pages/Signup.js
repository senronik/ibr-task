import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ADMIN_SIGN_UP } from '../api/apiUrl';
const SignUp = () => {
    const navigate = useNavigate();
    const [formdata, setFromdata] = useState({
        username: '',
        email: "",
        password: "",
        confirmpassword: "",
        address: "",
        location: "",
        number: "",
        role: 'admin'
    })
    const [errors, setErrors] = useState({});


    console.log("formdata", formdata);
    const handleOnchange = (e) => {
        const { name, value } = e.target;
        let error = '';
        if (name === 'username') {
            if (value.trim() === '') {
                error = 'Username is required';
            }
        } else if (name === 'email') {
            if (!/\S+@\S+\.\S+/.test(value)) {
                error = 'Invalid email address';
            }
        } else if (name === 'password') {
            if (value.length < 8) {
                error = 'Password must be at least 8 characters long';
            } else if (!/(?=.*\d)(?=.*[a-z])(?=.*\W)/.test(value)) {
                error = 'Password must contain at least one digit, one lowercase letter, and one special character';
            }
        } else if (name === 'confirmpassword') {
            if (value !== formdata.password) {
                error = 'Passwords do not match';
            }
        } else if (name === 'location') {
            if (value.trim() === '') {
                error = 'location is required';
            }
        }
        else if (name === 'address') {
            if (value.trim() === '') {
                error = 'address is required';
            }
        } else if (name === 'number') {
            if (value.trim() === '') {
                error = 'number is required';
            }
        }
        setFromdata({
            ...formdata,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: error,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${ADMIN_SIGN_UP}`, formdata);
            if (response.status === 201) {
                localStorage.setItem('user',JSON.stringify(response.data.user))
                // alert(response.data.message);
                toast.success(response.data.message);
                navigate('/signin')
            }
        } catch (error) {
            // alert(error.response.data.message)
            toast.error(error.response.data.message);
            console.error("Error", error.response.data.message);
        }
    }
    return (
        <div>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up to your account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or
                        <a className="font-medium text-indigo-600 hover:text-indigo-500"> start your 14-day free trial </a>
                    </p>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700"> Username </label>
                                <div className="mt-1">
                                    <input id="username"
                                        value={formdata.username}
                                        onChange={handleOnchange}
                                        name="username" type="text" autoComplete="username" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    {errors.username && <span className="error text-red-950">{errors.username}</span>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700"> Email address </label>
                                <div className="mt-1">
                                    <input id="email" value={formdata.email} onChange={handleOnchange} name="email" type="email" autoComplete="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    {errors.email && <span className="error text-red-950">{errors.email}</span>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700"> Password </label>
                                <div className="mt-1">
                                    <input id="password" value={formdata.password} onChange={handleOnchange} name="password" type="password" autoComplete="current-password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    {errors.password && <span className="error text-red-950">{errors.password}</span>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700">Confirm Password </label>
                                <div className="mt-1">
                                    <input id="confirmpassword" value={formdata.confirmpassword} onChange={handleOnchange} name="confirmpassword" type="password" autoComplete="confirm-password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    {errors.confirmpassword && <span className="error text-red-950">{errors.confirmpassword}</span>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700"> Address </label>
                                <div className="mt-1">
                                    <input id="address" value={formdata.address} onChange={handleOnchange} name="address" type="text" autoComplete="address" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    {errors.address && <span className="error text-red-950">{errors.address}</span>}

                                </div>
                            </div>
                            <div>
                                <label htmlFor="number" className="block text-sm font-medium text-gray-700"> Mobile No. </label>
                                <div className="mt-1">
                                    <input id="number" value={formdata.number} onChange={handleOnchange} name="number" type="text" autoComplete="address" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    {errors.number && <span className="error text-red-950">{errors.number}</span>}

                               </div>
                            </div>
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                                <select id="location" value={formdata.location} onChange={handleOnchange} name="location" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                    <option value=''>select location</option>
                                    <option value='canada'>Canada</option>
                                    <option value='us'>United States</option>
                                    <option value='mexico'>Mexico</option>
                                </select>
                                {errors.location && <span className="text-red-950">{errors.location}</span>}

                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900"> Remember me </label>
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign Up</button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500"> Or continue with </span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">
                                <div>
                                    <a className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <span className="sr-only">Sign Up with Facebook</span>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                            <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>

                                <div>
                                    <a className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <span className="sr-only">Sign Up with Twitter</span>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                </div>

                                <div>
                                    <a className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <span className="sr-only">Sign Up with GitHub</span>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
