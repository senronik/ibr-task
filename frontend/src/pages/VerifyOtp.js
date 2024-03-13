import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import { ADMIN_VERIFY_OTP,ADMIN_SIGN_IN } from '../api/apiUrl';
const VerifyOtp = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    console.log("otp", otp)
    const handleOnchange = (e) => {
        setOtp(e.target.value);
    }
    const handleResend = async () => {
        try {
            const formData = JSON.parse(localStorage.getItem('user'));
            console.log("formdata", formData)
            const response = await axios.post(`${ADMIN_SIGN_IN}`, formData);
            if (response.status === 200) {
                toast.success("otp sent successfully");
            }
        } catch (error) {
            console.error("Error", error);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get("token")
            const decoded = jwtDecode(token);
            console.log("decode", decoded)
            const userId = decoded.userId;
            console.log("userId", userId)
            const response = await axios.post(`${ADMIN_VERIFY_OTP}`, { otp, userId });
            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('user', JSON.stringify(response.data.user));
                Cookies.set('token', token, { expires: 1 / 24 * 5, secure: true });
                toast.success('verified')
                navigate('/');
            }
        } catch (error) {
            toast.error(error.response.data.message)
            console.error("Error", error)
        }
    }
    return (
        <div>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Verify OTP</h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                            <div>
                                <label for="otp" className="block text-sm font-medium text-gray-700">OTP</label>
                                <div className="mt-1">
                                    <input id="otp" value={otp} onChange={handleOnchange} name="otp" type="text" autocomplete="text" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <p className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={handleResend}>Resend </p>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Verify</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default VerifyOtp