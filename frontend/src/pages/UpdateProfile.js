import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ADMIN_UPDATE_PROFILE } from "../api/apiUrl";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
const Update = () => {
  const navigate = useNavigate();
  const [formdata, setFromdata] = useState({
    username: "",
    email: "",
    address: "",
    location: "",
    number: "",
    role: "admin",
  });
 
  const [errors, setErrors] = useState({});

  console.log("formdata", formdata);
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    let error = "";
    if (name === "username") {
      if (value.trim() === "") {
        error = "Username is required";
      }
    } else if (name === "location") {
      if (value.trim() === "") {
        error = "location is required";
      }
    } else if (name === "address") {
      if (value.trim() === "") {
        error = "address is required";
      }
    } else if (name === "number") {
      if (value.trim() === "") {
        error = "number is required";
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
    console.log("running");
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      const decoded = jwtDecode(token);
      const response = await axios.post(
        `${ADMIN_UPDATE_PROFILE}/${decoded.userId}`,
        formdata
      );
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      // alert(error.response.data.message)
      toast.error(error.response.data.message);
      console.error("Error", error.response.data.message);
    }
  };
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.user) {
        setFromdata(decoded.user);
      }
    }
  }, []);
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
            Update your profile
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit} method="POST">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Username{" "}
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    value={formdata.username}
                    onChange={handleOnchange}
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.username && (
                    <span className="error text-red-950">
                      {errors.username}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    value={formdata.email}
                    readOnly
                    onChange={handleOnchange}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.email && (
                    <span className="error text-red-950">{errors.email}</span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Address{" "}
                </label>
                <div className="mt-1">
                  <input
                    id="address"
                    value={formdata.address}
                    onChange={handleOnchange}
                    name="address"
                    type="text"
                    autoComplete="address"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.address && (
                    <span className="error text-red-950">{errors.address}</span>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Mobile No.{" "}
                </label>
                <div className="mt-1">
                  <input
                    id="number"
                    value={formdata.number}
                    onChange={handleOnchange}
                    name="number"
                    type="text"
                    autoComplete="address"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.number && (
                    <span className="error text-red-950">{errors.number}</span>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <select
                  id="location"
                  value={formdata.location}
                  onChange={handleOnchange}
                  name="location"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">select location</option>
                  <option value="canada">Canada</option>
                  <option value="us">United States</option>
                  <option value="mexico">Mexico</option>
                </select>
                {errors.location && (
                  <span className="text-red-950">{errors.location}</span>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      
    </div>
  );
};
export default Update;
