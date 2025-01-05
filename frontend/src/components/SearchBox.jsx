import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/profile/${query}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-1 sm:p-4">
      <div className="bg-[#fbfbfd] py-10 min-w-screen sm:min-w-[40rem] md:min-w-[60rem] px-10 rounded-3xl">
        <div className="text-5xl flex flex-col items-center  justify-center pb-10 font-bold text-center mb-6 mt-4 sm:mt-10 bg-gradient-to-br from-[#224D88] via-[#935893] to-[#E896B8] bg-clip-text text-transparent ">
          <div className="flex w-48 flex-row items-center justify-center">
            <img src="./logo.png" alt="" />
          </div>
          <h1> Channel Analyser</h1>
        </div>
        <form
          className="flex flex-col items-center w-full sm:px-10"
          onSubmit={handleSearch}
        >
          <div className="hover:scale-[1.05] hover:shadow-md hover:shadow-white transition-all duration-300 border border-black  flex w-full  items-center p-3 rounded-full bg-[#fff5eebc]">
            <button className="sm:p-3 text-lg font-medium text-white  rounded-l-lg  ">
              <span className="font-bold text-2xl text-black">@</span>
            </button>
            <input
              type="search"
              className="p-3 text-lg w-full  bg-[#fff5eebc] placeholder:text-gray-900 text-gray-900 outline-none   "
              placeholder="Search for Username"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button
              type="submit"
              className="p-4 ms-2 text-sm font-medium text-white bg-blue-700 rounded-full focus:ring-4 focus:outline-none dark:focus:ring-blue-600"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
