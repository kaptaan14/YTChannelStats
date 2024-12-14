import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { setTopVideos } from "../state";
import { BsInfoCircle } from "react-icons/bs";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ProfileCard() {
  const [loading, setLoading] = useState(false);
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
      const response = await fetch(
        `${apiUrl}/api/youtube/uploads?upload_id=${uploads}`
      ); //setting_upload_id and getting top 10 videos
      const data = await response.json();
      console.log(data);
      dispatch(setTopVideos(data));
      navigate("/top10videos");
    } catch (error) {
      console.error("Error fetching additional videos:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex items-center min-h-screen justify-center ">
      <div className="bg-grey  hover:scale-[1.05] transition-all duration-300 f rounded-3xl min-h-[80%] max-w-[24rem] sm:min-w-[40rem] md:min-w-[60rem] sm:max-w-[40rem] md:max-w-[60rem]    flex flex-col items-center justify-center  pt-8 p-2 overflow-hidden">
        {/* Profile Image */}
        <div className="flex justify-end w-full mr-4 group relative">
          <button className="group relative hover:text-red-600">
            <BsInfoCircle size={20} />
          </button>
          <div className="absolute invisible rounded-lg bg-white  group-hover:visible max-w-[20rem]  sm:max-w-sm  z-10 text-sm p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 top-full mt-2">
            {profileData.Description}
          </div>
        </div>

        <div className="w-48 h-48  rounded-full overflow-hidden cursor-pointer transition-transform duration-1000 transform hover:rotate-[360deg]">
          <img
            className="w-full h-full object-cover"
            src={profileData.Profile}
            alt="Profile"
          />
        </div>

        {/* Description */}
        <div className="p-4 border-b-2 w-full mb-5">
          <h2 className="text-2xl text-center font-bold mb-2">
            {profileData.Channel_Name}
          </h2>
          {/* <p className="text-gray-600">{profileData.Description}</p> */}
        </div>

        {/* Stats */}
        <div className="flex flex-row gap-16 sm:gap-20">
          <div className="text-center">
            <p className="text-lg  font-bold">Subscribers</p>
            <p>{profileData.Subscribers}</p>
          </div>

          <div className="text-center">
            <p className="text-lg  font-bold">Videos</p>
            <p>{profileData.Videos}</p>
          </div>

          <div className="text-center">
            <p className="text-lg  font-bold">Views</p>
            <p>{profileData.Views}</p>
          </div>
        </div>

        {/* Button to Check Top 10 Videos */}
        <div className="p-4 mt-10">
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
