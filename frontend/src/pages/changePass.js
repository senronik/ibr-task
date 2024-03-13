import React from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ADMIN_NEW_PASS } from "../api/apiUrl";
const ChangePass = () => {
  const navigate = useNavigate();
  const [formdata1, setFromdata1] = useState({
    oldPass: "",
    newPass: "",
    confirmPass: "",
    role: "admin",
  });
  console.log("formdata", formdata1);
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  const handleOnchange1 = (e) => {
    const { name, value } = e.target;
    let error = "";
    if (name === "newPass") {
      if (value.length < 8) {
        error = "Password must be at least 8 characters long";
      } else if (!/(?=.*\d)(?=.*[a-z])(?=.*\W)/.test(value)) {
        error =
          "Password must contain at least one digit, one lowercase letter,and one special character";
      }
    } else if (name === "confirmPass") {
      if (value !== formdata1.newPass) {
        error = "Passwords do not match";
      }
    }
    setFromdata1({
      ...formdata1,
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
        const token = Cookies.get("token");
        const decoded = jwtDecode(token);
        const response = await axios.post(`${ADMIN_NEW_PASS}/${decoded.userId}`, formdata1);
        if (response.status === 200) {
            toast.success(response.data.message)
            // alert(response.data.message);
            console.log("response",response)
            setFromdata1({});
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
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Change Password
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              onSubmit={handleSubmit}
              method="POST"
            >
              <div>
                <label
                  for="oldPass"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Old Password{" "}
                </label>
                <div className="mt-1">
                  <input
                    id="oldPass"
                    value={formdata1.oldPass}
                    onChange={handleOnchange1}
                    name="oldPass"
                    type={!showPass ? "password" : "text"}
                    autocomplete="oldPass"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  for="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  New Password{" "}
                </label>
                <div className="mt-1">
                  <input
                    id="newPass"
                    value={formdata1.newPass}
                    onChange={handleOnchange1}
                    name="newPass"
                    type={!showPass ? "password" : "text"}
                    autocomplete="newPass"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.newPass && (
                    <span className="text-red-950">{errors.newPass}</span>
                  )}
                </div>
              </div>
              <div>
                <label
                  for="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Confirm{" "}
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPass"
                    value={formdata1.confirmPass}
                    onChange={handleOnchange1}
                    name="confirmPass"
                    type="password"
                    autocomplete="confirmPass"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.confirmPass && (
                    <span className="text-red-950">{errors.confirmPass}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    onChange={() => setShowPass(!showPass)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    for="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Show Password{" "}
                  </label>
                </div>

                <div className="text-sm">
                  {/* <a  className="font-medium text-indigo-600 hover:text-indigo-500" onClick={()=>navigate('/forget-pass')}> Forgot your password? </a> */}
                </div>
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

export default ChangePass;
