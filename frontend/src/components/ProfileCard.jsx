import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { setTopVideos } from "../state";
const apiUrl = import.meta.env.VITE_API_URL;


export default function ProfileCard() {
  const [loading,setLoading] = useState(false); 
  const profileData = useSelector((state) => state.channel.data);
  const uploads = useSelector((state) => state.channel.data.Uploads);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!profileData) {
    return (
      <p className="flex font-bold text-3xl text-center justify-center bg-gray-800 items-center min-h-screen text-white">
        No profile data
      </p>
    );
  }

  const handleTopVideos = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/youtube/uploads?upload_id=${uploads}`);  //setting_upload_id and getting top 10 videos
      const data = await response.json();
      console.log(data)
      dispatch(setTopVideos(data));
      navigate('/top10videos')
    } catch (error) { 
      console.error("Error fetching additional videos:", error);
    } finally {
      setLoading(false);
    }
  };

  if(loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
      <Loader />
    </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        {/* Profile Image */}
        <div className="w-full h-64 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={profileData.Profile}
            alt="Profile"
          />
        </div>

        {/* Description */}
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">
            {profileData.Channel_Name}
          </h2>
          <p className="text-gray-600">{profileData.Description}</p>
        </div>

        {/* Stats */}
        <div className="flex flex-col p-4 border-t border-gray-200">
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-gray-700">Subscribers:</span>
            <span className="text-gray-900">{profileData.Subscribers}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-gray-700">Videos:</span>
            <span className="text-gray-900">{profileData.Videos}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-semibold text-gray-700">Views:</span>
            <span className="text-gray-900">{profileData.Views}</span>
          </div>
        </div>

        {/* Button to Check Top 10 Videos */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleTopVideos}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Check Top 10 Videos
          </button>
        </div>
      </div>
    </div>
  );
}
