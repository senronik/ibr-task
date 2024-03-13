import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { ADMIN_CHANGE_PASS } from '../api/apiUrl';
const ForgetPass1 = () => {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const queryParameters = new URLSearchParams(window.location.search)
    const userId = queryParameters.get("id")
    const [formData, setFormdata] = useState({
        password: "",
        confirmPassword: "",
    })
    const [errors, setErrors] = useState({});
    console.log("formdata", formData);

    const handleOnchange = (e) => {
        let error = ''
        setFormdata({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'password') {
            if (e.target.value.length < 6) {
                error = 'Password must be at least 6 character long'
            } else if (!/(?=.*\d)(?=.*[a-z])(?=.*\W)/.test(e.target.value)) {
                error = 'Password must contain at least one digit, one lowercase letter, and one special character';
            }
        } else if (e.target.name === 'confirmPassword') {
            if (e.target.value !== formData.password) {
                error = 'Passwords do not match';
            }
        }
        setErrors({
            ...errors,
            [e.target.name]: error
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${ADMIN_CHANGE_PASS}/${userId}`, formData);
            if (response.status === 200) {
                toast.success(response.data.message)
                // alert(response.data.message);
                navigate('/signin');
            }
        } catch (error) {
            toast.error(error.response.data.message)
            // alert(error.response.data.message)
            console.error("Error", error)
        }
    }
    return (
        <div>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Set New Password</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                            <div>
                                <label for="password" className="block text-sm font-medium text-gray-700"> New Password </label>
                                <div className="mt-1">
                                    <input id="password" value={formData.password} onChange={handleOnchange} name="password" type={!showPass ? 'password' : 'text'} autocomplete="password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    {errors.password && <span className='text-red-950'>{errors.password}</span>}
                                </div>
                            </div>
                            <div>
                                <label for="confirmPassword" className="block text-sm font-medium text-gray-700"> Confirm </label>
                                <div className="mt-1">
                                    <input id="confirmPassword" value={formData.confirmPassword} onChange={handleOnchange} name="confirmPassword" type="password" autocomplete="confirmPassword" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    {errors.confirmPassword && <span className='text-red-950'>{errors.confirmPassword}</span>}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" onChange={() => setShowPass(!showPass)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                    <label for="remember-me" className="ml-2 block text-sm text-gray-900">Show Password </label>
                                </div>

                                <div className="text-sm">
                                    {/* <a  className="font-medium text-indigo-600 hover:text-indigo-500" onClick={()=>navigate('/forget-pass')}> Forgot your password? </a> */}
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default ForgetPass1