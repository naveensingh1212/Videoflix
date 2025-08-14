import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { Context } from "../context/contextApi";
import { FadeLoader } from "react-spinners";
import SearchResultVideoCard from "./SearchResultVideoCard";
import LeftNavMenuItems from "./LeftNavMenuItems.jsx";
import LeftNav from "./LeftNav.jsx";
import { FaSketch } from "react-icons/fa";
const History = () => {
  const [videos, setVideos] = useState([]);
  const { loading, setLoading, isSideBarVisible } = useContext(Context);

  const getHistoryVideos = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/users/getWatchHistory`);
      console.log(response);
      console.log(response.data);

      if (response.data && Array.isArray(response.data.data)) {
        setVideos(response.data.data);
      } else {
        setVideos([]);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching the Video history of the user", error);
      setLoading(false);
    }
  };

  const handleRemoveVideoFromWatchHistory = async (videoId) => {
    try {
      setLoading(true);
      console.log("Video to be removed", videoId);

      // Call delete endpoint to remove the video
      await axiosInstance.delete(`/videos/deleteVideoFromHistory/${videoId}`);

      // Update the state by removing the deleted video from the array
      setVideos((prevVideos) =>
        prevVideos.filter((item) => item.id !== videoId)
      );

      setLoading(false);
    } catch (error) {
      console.log(
        "Error removing video from watch History",
        error.response?.data || error
      );
      setLoading(false);
    }
  };

  const clearWatchHistory = async () => {
    try {
      setLoading(true);
      await axiosInstance.delete("/videos/deleteHistory");
      setVideos([]);
      setLoading(false);
    } catch (error) {
      console.log("Error clearing the watch History", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getHistoryVideos();
  }, []);

  return (
    <div className="flex flex-row h-[calc(100%-56px)] relative left-[84px] w-[calc(100%-84px)]">
      {isSideBarVisible ? <LeftNavMenuItems /> : <LeftNav />}
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black ">
        <div className="p-5 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white mb-4">Watch History</h1>
          <button
            onClick={() => {
              clearWatchHistory();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
          >
            Clear All History
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <FadeLoader color="#3498db" loading={loading} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 p-5">
            {Array.isArray(videos) && videos.length === 0 ? (
              <div className="text-3xl font-bold text-white mb-4 flex justify-center items-center h-full">
                No videos found
              </div>
            ) : (
              videos.map((item, idx) => {
                // console.log("Current Video is", item);
                // let video = null;
                // if (item?.videoFile) {
                //   video = {
                //     id: item._id,
                //     title: item.title || "Untitled Video",
                //     thumbnail: item.thumbnail,
                //     description:
                //       item.description || "No description available.",
                //     channelTitle: item.owner?.name || "Unknown Channel",
                //     views: item.views || 0,
                //     createdAt: item.createdAt,
                //   };
                // } else if (item?.id) {
                //   video = {
                //     id: item.id,
                //     title: item.title,
                //     thumbnail: item.thumbnail,
                //     description: item.description,
                //     channelTitle: item.channelTitle,
                //     viewCount: item.viewCount || 0,
                //     publishedTimeText: item.publishDate,
                //   };
                // }
                return (
                  <SearchResultVideoCard
                    key={item.id || item._id || idx}
                    video={item}
                    isHistory={true}
                    handleRemoveVideoFromWatchHistory={
                      handleRemoveVideoFromWatchHistory
                    }
                  />
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
