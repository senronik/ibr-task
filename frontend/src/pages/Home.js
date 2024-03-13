import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import TableContent from "../Components/TableContent";
const Home = () => {
  const token = Cookies.get("token");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    localStorage.removeItem("user");
    Cookies.remove("token");
    window.location.reload();
  };
  const navigate = useNavigate();
  return (
    <>
      <header className="bg-indigo-600">
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Top"
        >
          <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
            <div className="flex items-center">
              <a href="#">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-10 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                  alt=""
                />
              </a>
              {/* <div className="hidden ml-10 space-x-8 lg:block">
                <a href="#" className="text-base font-medium text-white hover:text-indigo-50"> Solutions </a>

                <a href="#" className="text-base font-medium text-white hover:text-indigo-50"> Pricing </a>

                <a href="#" className="text-base font-medium text-white hover:text-indigo-50"> Docs </a>

                <a href="#" className="text-base font-medium text-white hover:text-indigo-50"> Company </a>
              </div> */}
            </div>
            <div className="ml-10 space-x-4">
              {token ? (
                <>
                  <a
                    className="inline-block cursor-pointer	 bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        type="button"
                        className="inline-flex w-full  border border-transparent justify-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-medium text-white shadow-sm  hover:bg-opacity-75"
                        onClick={toggleMenu}
                        aria-expanded={isOpen ? "true" : "false"}
                        aria-haspopup="true"
                      >
                        Profile
                        <svg
                          className="-mr-1 h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    {isOpen && (
                      <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1" role="none">
                          <a
                            className="block px-4 py-2 text-sm text-gray-700 cursor-pointer	"
                            role="menuitem"
                            onClick={()=>navigate('/update-profile')}
                          >
                            Update Profile
                          </a>
                          <a
                            
                            className="block px-4 py-2 text-sm text-gray-700 cursor-pointer	"
                            role="menuitem"
                            onClick={()=>navigate('/change-password')}
                          >
                            Change Password
                          </a>
                          {/* <form method="POST" action="#" role="none">
                            <button
                              type="submit"
                              className="block w-full px-4 py-2 text-sm text-gray-700"
                              role="menuitem"
                            >
                              Sign out
                            </button>
                          </form> */}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <a
                    className="inline-block cursor-pointer	 bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                    onClick={() => navigate("/signin")}
                  >
                    Sign in
                  </a>
                  <a
                    className="inline-block cursor-pointer	 bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </a>
                </>
              )}
            </div>
          </div>
          {/* <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
            <a href="#" className="text-base font-medium text-white hover:text-indigo-50"> Solutions </a>

            <a href="#" className="text-base font-medium text-white hover:text-indigo-50"> Pricing </a>

            <a href="#" className="text-base font-medium text-white hover:text-indigo-50"> Docs </a>

            <a href="#" className="text-base font-medium text-white hover:text-indigo-50"> Company </a>
          </div> */}
        </nav>
      </header>
      <main className="mt-5">
      {token && <TableContent/>}
      </main>
    </>
  );
};

export default Home;
