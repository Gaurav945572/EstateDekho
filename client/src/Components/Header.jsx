import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Logo/logo.svg";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  // Function to toggle the dropdown state
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-12" alt="HomeSpace Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            <div className="leading-tight">
              <div>HomeSpace</div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                Find your perfect NEST
              </div>
            </div>
          </span>
        </a>

        <div className="flex md:order-2">
          <div className="sm:hidden">
            {currentUser ? (
              <Link to='/profile'>
                <img className={`h-10 rounded-full w-10 ${isDropdownOpen ? "block" : "block"}`} src={currentUser.avatar} alt="Profile" />
              </Link>
            ) : null}
          </div>
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded={isDropdownOpen ? "true" : "false"}
            onClick={toggleDropdown}
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
          >
            <span className="sr-only">Toggle dropdown</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

          <div className={`relative ${isDropdownOpen ? "hidden" : "hidden"} sm:block`}>
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FaSearch className="text-gray-900" />
              <span className="sr-only">Search icon</span>
            </div>
            <form onSubmit={handleSubmit} action="">
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 outline-none rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </form>
          </div>
        </div>

        <div
          className={`items-center justify-between w-full p-2 md:p-0 md:flex md:w-auto md:order-1 ${isDropdownOpen ? "block" : "hidden"}`}
          id="navbar-search"
        >
          <ul className="flex flex-col font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className={`block sm:hidden m-2`}>
              <div className={`relative ${isDropdownOpen ? "block" : "hidden"} sm:block`}>
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <FaSearch className="text-gray-900" />
                  <span className="sr-only">Search icon</span>
                </div>
                <form onSubmit={handleSubmit} action="">
                  <input
                    type="text"
                    id="search-navbar"
                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 outline-none rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                </form>
              </div>
            </li>

            <li>
              <Link
                to="/"
                className={`m-2 block hover:underline py-2 px-3 text-gray-900 rounded hover:bg-blue-700 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:text-white md:dark:hover:bg-transparent`}
                aria-current="page"
                onClick={(e) => {
                  setIsDropdownOpen(false);
                }}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                onClick={(e) => { setIsDropdownOpen(false); }}
                to="/about"
                className="m-2 block hover:underline py-2  text-gray-900 px-3 rounded hover:bg-blue-700 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About
              </Link>
            </li>
            <li>
              {currentUser === null && isDropdownOpen && (
                <Link
                  onClick={(e) => { setIsDropdownOpen(false); }}
                  to="/sign-in"
                  className={` block hover:underline hover:bg-blue-700 m-2 py-2 px-3  text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white`}
                >
                  SignIn
                </Link>
              )}
            </li>
            <li>
              {currentUser ? (
                <Link to='/profile'>
                  <img className={`h-10 rounded-full w-10 ${isDropdownOpen ? "hidden" : "block"}`} src={currentUser.avatar} alt="Profile" />
                </Link>
              ) : (
                <Link
                  to="/sign-in"
                  className={`block hover:underline hover:bg-blue-700 py-2 mt-2 -mx-8  ${isDropdownOpen ? "hidden" : "block"} text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                >
                  SignIn
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
