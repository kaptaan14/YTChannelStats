import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setChannelData } from '../state/index.js';
import { useNavigate } from "react-router-dom";
import Loader from "./Loader.jsx";
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_API_URL;

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [loading,setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setQuery("")
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/youtube?channel_name=${query}`);  //fetching channel data
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch channel data');
      }
      const data = await response.json();
      dispatch(setChannelData(data));
      navigate('/profile')
    } catch (error) {
      toast.error(error.message || 'Error fetching channel data');
    }finally {
      setLoading(false); 
    }
  };
  if(loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <Loader />
    </div>
    )
  }

  return (
  
    <div className="flex flex-col items-center min-h-screen bg-gray-800 p-4">
      <h1 className="text-5xl text-white font-bold text-center mb-6 mt-4 sm:mt-10">
        YouTube Channel Analyser
      </h1>
      <form
        className="flex flex-col items-center w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full max-w-md items-center">
          <button
            className="p-3 text-lg font-medium text-white bg-red-700 rounded-l-lg border border-red-700"
          >
            <span className="font-bold">@</span>
          </button>
          <input
            type="search"
            className="p-3 text-lg w-full text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search for username."
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            type="submit"
            className="p-4 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:outline-none dark:focus:ring-blue-600"
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
  );
}
