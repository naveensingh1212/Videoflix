import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context/contextApi";
import SearchResultVideoCard from "./SearchResultVideoCard";
import axiosInstance from "../utils/AxiosInstance.jsx";
import LeftNavMenuItems from "./LeftNavMenuItems.jsx";
import LeftNav from "./LeftNav.jsx";
import { FadeLoader } from "react-spinners";

const SearchResult = () => {
  const [result, setResult] = useState([]);
  const { searchQuery } = useParams();
  const { loading, setLoading, isSideBarVisible } = useContext(Context);

  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery]);

  const fetchSearchResults = async () => {
    setLoading(true);
    const response = await axiosInstance.get(`/videos/category/${searchQuery}`);
    console.log(response.data);
    setResult(response.data);
    setLoading(false);
  };

  const fetchVideoDetails = async (id) => {
    try {
      // setLoading(true);
      // setRelatedVideos([]);
      const response = await axios.get(
        `http://localhost:3000/api/v1/videos/info/${id}`
      );
      // console.log("Videos Details", response.data);

      // setVideo(response.data);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  return (
    <div className="flex flex-row h-[calc(100%-56px)] relative left-[84px] w-[calc(100%-84px)]">
      {isSideBarVisible ? <LeftNavMenuItems /> : <LeftNav />}
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black scrollbar-hide">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <FadeLoader color="#3498db" loading={loading} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 p-5 ">
            {result.length === 0 ? (
              <div>No videos found</div>
            ) : (
              result.map((item, idx) => {
                let videos = [];

                if (item?.type === "video") {
                  videos = [item];
                }
                // else if (
                //   item?.type === "playlist" &&
                //   Array.isArray(item.videos)
                // )
                //  {
                //   videos = item.videos;
                // }
                else if (
                  item?.type === "shorts_listing" &&
                  Array.isArray(item.data)
                ) {
                  videos = item.data;
                }

                if (videos.length === 0) return null;

                return videos.map((video) => {
                  return (
                    <SearchResultVideoCard
                      key={video.videoId || video._id || idx}
                      video={video}
                      isHistory={false}
                    />
                  );
                });
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
