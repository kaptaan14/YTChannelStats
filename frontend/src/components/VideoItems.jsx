import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThumbsUp } from "lucide-react";
import { Eye } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { setTopVideos } from "../state";

const apiUrl = import.meta.env.VITE_API_URL;

export default function VideoItem() {
  const topVideos = useSelector((state) => state.channel.topVideos);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { uploadId } = useParams();

  useEffect(() => {
    const handleTopVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${apiUrl}/api/youtube/uploads?upload_id=${uploadId}`
        );
        const data = await response.json();
        dispatch(setTopVideos(data));
      } catch (error) {
        console.error("Error fetching  videos:", error);
      } finally {
        setLoading(false);
      }
    };

    handleTopVideos();
  }, []);

if(!topVideos){
  return (
    <h1>Wow</h1>
  )
}

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <Loader />
      </div>
    );
  } else {
    return (
      <>
        {topVideos && (
          <div className="p-3">
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
                    className="bg-grey  hover:shadow-grey p-1 hover:scale-[1.01] transition-all duration-300 rounded-2xl shadow-sm  cursor-pointer "
                  >
                    <div className="relative w-full pb-[56.25%]">
                      {" "}
                      <img
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
                        src={video.Thumbnail}
                        alt={video.Title}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {video.Title}
                      </h3>
                      <div className="flex flex-row gap-3 text-sm">
                        <p className="text-gray-600 mb-1 flex flex-row items-center gap-1">
                          <span>{video.Likes} </span>
                          <span>
                            <ThumbsUp size={15} />
                          </span>
                        </p>
                        <p>⦁</p>
                        <p className="text-gray-600 mb-1 flex flex-row items-center gap-1">
                          <span>{video.Views} </span>
                          <span>
                            <Eye size={16} />
                          </span>
                        </p>
                        <p>⦁</p>
                        <p className="text-gray-600 mb-1 flex flex-row items-center gap-1">
                          <span>{video.Comments} </span>
                          <span>
                            <MessageSquare size={15} />
                          </span>
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
