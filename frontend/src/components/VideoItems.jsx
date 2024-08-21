import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function VideoItem() {
  const videos = useSelector((state) => state.channel.topVideos);
  const [topVideos,setTopVideos] = useState([]);

  useEffect(() => {
    if(videos){
      setTopVideos(videos) 
    }
  }, [videos])
  

  if (!topVideos) {
    return (
      <p className="flex font-bold text-3xl text-center justify-center bg-gray-800 items-center min-h-screen text-white">
        No Videos Found
      </p>
    );
  }

  return (
    <div className="bg-gray-800 p-3">
      <div className="w-full max-w-5xl mx-auto pt-5 mb-10">
        <h1 className="text-center text-4xl mb-10 italic font-medium text-blue-600">
          #Top10Videos
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          {topVideos.map((video, index) => (
            <a
              target="_blank"
              href={`https://www.youtube.com/watch?v=${video.Video_id}`}
              key={index}
              className="bg-blue-200 border border-blue-100 rounded-lg shadow-md  cursor-pointer "
            >
              <div className="relative w-full pb-[56.25%] bg-gray-200 rounded-t-lg">
                {" "}
                <img
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
                  src={video.Thumbnail}
                  alt={video.Title}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{video.Title}</h3>
                <p className="text-gray-600 mb-1">Likes: {video.Likes}</p>
                <p className="text-gray-600 mb-1">Views: {video.Views}</p>
                <p className="text-gray-600">Comments: {video.Comments}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
