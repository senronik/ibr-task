import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ADMIN_FORGET_PASS } from '../api/apiUrl';
const ForgetPass = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const handleOnchange = (e) => {
        setEmail(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${ADMIN_FORGET_PASS}`, { email, role: 'admin' });
            if (response.status === 200) {
                console.log(response);
                toast.success("Email sent to reset password")
                navigate('/signin')
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.error("Error", error)
        }
    }
    return (
        <div>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Enter Email to change Password</h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                            <div>
                                <label for="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <div className="mt-1">
                                    <input id="email" value={email} onChange={handleOnchange} name="email" type="email" autocomplete="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ForgetPass