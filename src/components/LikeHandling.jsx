import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/contextApi";
import LikedVideoDisplay from "./LikedVideoDisplay.jsx";
import axiosInstance from "../utils/AxiosInstance";
import LeftNavMenuItems from "./LeftNavMenuItems.jsx";
import LeftNav from "./LeftNav.jsx";
import { FadeLoader } from "react-spinners";

const LikeHandling = () => {
  const { loading, setLoading, isSideBarVisible } = useContext(Context);
  const [likedVideos, setLikedVideos] = useState([]);

  const getLikedVideos = async (videoId) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/like/likedVideos`);
      console.log(response);
      console.log(response.data);
      const videos = response.data.data || [];
      setLikedVideos(videos);
      setLoading(false);
    } catch (error) {
      console.log("Error liking the video", error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getLikedVideos();
  }, []);

  return (
    <div className="flex flex-row h-[calc(100%-56px)] relative left-[84px] w-[calc(100%-84px)]">
      {isSideBarVisible ? <LeftNavMenuItems /> : <LeftNav />}
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black ">
        <div className="p-5">
          <h1 className="text-3xl font-bold text-white mb-4">Liked Videos</h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <FadeLoader color="#3498db" loading={loading} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 p-5">
            {Array.isArray(likedVideos) && likedVideos.length === 0 ? (
              <div className="text-3xl font-bold text-white mb-4 flex justify-center items-center h-full">
                No videos found
              </div>
            ) : (
              likedVideos.map((item, idx) => {
                return (
                  <LikedVideoDisplay
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

export default LikeHandling;
