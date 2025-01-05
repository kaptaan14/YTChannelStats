import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { useNavigate, useParams } from "react-router-dom";
import { setChannelData, setTopVideos } from "../state";
import { BsInfoCircle } from "react-icons/bs";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ProfileCard() {
  const [loading, setLoading] = useState(false);
  const profileData = useSelector((state) => state.channel.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { channelName } = useParams();

  const handleTopVideos = () => {
    const uploadId = profileData.Uploads;
    navigate(`/${channelName}/top10videos/${uploadId}`);
  };

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${apiUrl}/api/youtube?channel_name=${channelName}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch channel data");
        }
        const data = await response.json();
        dispatch(setChannelData(data));
      } catch (error) {
        toast.error(error.message || "Error fetching channel data");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (channelName) {
      fetchChannelData();
    }
  }, [channelName]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <Loader />
      </div>
    );
  }

  if(!profileData){
    return (
      <h1>No Profile Found</h1>
    )
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

        <div className="w-48 h-48  rounded-full overflow-hidden cursor-pointer transition-transform duration-500 transform hover:scale-[1.1]">
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
