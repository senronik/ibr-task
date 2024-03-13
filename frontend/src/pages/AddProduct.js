import React, { useState } from "react";
import { ADD_PRODUCT } from "../api/apiUrl";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddProduct = () => {
    const navigate = useNavigate();
    const [formdata,setFormdata]=useState({
        name:"",
        type:"",
        price:"",
        description:""
    });
    console.log("formdata",formdata);
    const handleChange = (e) =>{
        const { name, value } = e.target;
        setFormdata({
            ...formdata,
            [name]:value
        })
    }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = Cookies.get("token")
        
    const headers = {
        Authorization: `Bearer ${token}`,
        role: "admin", 
      };
  
      const response = await axios.post(`${ADD_PRODUCT}`, formdata, { headers });
      if(response.status===201){
        console.log(response)
        toast.success("Product Added");
        navigate('/');
      }
    } catch (error) {
        toast.error(error.response.data.error);
        console.log(error);
    }
  };
  return (
    <div>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add Product
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit} method="POST">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name{" "}
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    value={formdata.name}
                    onChange={handleChange}
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Type/Category{" "}
                </label>
                <div className="mt-1">
                  <input
                    id="type"
                    name="type"
                    value={formdata.type}
                    onChange={handleChange}
                    type="text"
                    autoComplete="type"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Price{" "}
                </label>
                <div className="mt-1">
                  <input
                    id="price"
                    name="price"
                    value={formdata.price}
                    onChange={handleChange}
                    type="number"
                    autoComplete="current-price"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  for="description"
                  class="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <div class="mt-1">
                  <textarea
                    rows="4"
                    name="description"
                    value={formdata.description}
                    onChange={handleChange}
                    id="description"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  ></textarea>
                </div>
              </div>
              {/* <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                                <select id="location" name="location" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                    <option value=''>select location</option>
                                    <option value='canada'>Canada</option>
                                    <option value='us'>United States</option>
                                    <option value='mexico'>Mexico</option>
                                </select>

                            </div> */}
              {/* <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900"> Remember me </label>
                                </div>
                            </div> */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
