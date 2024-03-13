import React from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ADMIN_VERIFY_EMAIL } from '../api/apiUrl';
const Verify = () => {
    const navigate=useNavigate();
    const queryParameters = new URLSearchParams(window.location.search)
    const token = queryParameters.get("token")

    useEffect(()=>{
        const verifyEmail=async ()=>{
            try {
                const response=await axios.get(`${ADMIN_VERIFY_EMAIL}/${token}`);
                if(response.status===200){
                    console.log("email verified success");
                    navigate('/signin')
                }
            } catch (error) {
                console.error("Error",error)
            }
        }
        verifyEmail();
    },[]);
    return (
        <>
            <div class="text-center d-flex justify-center align-center">
                <h3 class="mt-2 text-sm font-medium text-gray-900">Authentication</h3>
                <div class="mt-6">
                    <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Verifying
                    </button>
                </div>
            </div>
        </>
    )
}
export default Verify