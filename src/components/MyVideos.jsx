import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { Context } from "../context/contextApi";
import LeftNavMenuItems from "./LeftNavMenuItems";
import LeftNav from "./LeftNav";
import { FadeLoader } from "react-spinners";
import LikedVideoDisplay from "./LikedVideoDisplay.jsx";
import MyVideosDisplay from "./MyVideosDisplay.jsx";
const MyVideos = () => {
  const { loading, setLoading, isSideBarVisible } = useContext(Context);

  const [videos, setVideos] = useState([]);
  const getUploadedVideos = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("users/getUploadedVideo");
      console.log(response);
      const videos = response.data.data || [];
      setVideos(videos);
      setLoading(false);
    } catch (error) {
      console.log("Error liking the video", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUploadedVideos();
  }, []);

  return (
    <div className="flex flex-row h-[calc(100%-56px)] relative left-[84px] w-[calc(100%-84px)]">
      {isSideBarVisible ? <LeftNavMenuItems /> : <LeftNav />}
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black ">
        <div className="p-5">
          <h1 className="text-3xl font-bold text-white mb-4">
            Uploaded Videos
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <FadeLoader color="#3498db" loading={loading} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 p-5">
            {Array.isArray(videos) && videos.length === 0 ? (
              <div className="text-3xl font-bold text-white mb-4">
                No videos found
              </div>
            ) : (
              videos.map((item, idx) => {
                return (
                  <MyVideosDisplay
                    key={item.id || item._id || idx}
                    video={item}
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

export default MyVideos;
