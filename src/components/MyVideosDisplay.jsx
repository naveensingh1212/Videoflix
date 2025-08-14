import React, { useContext } from "react";
import { Context } from "../context/contextApi";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";

const MyVideosDisplay = ({ video }) => {
  const { handleAddVideoToWatchHistory } = useContext(Context);
  return (
    <Link to={`/video/${video?._id}`}>
      <div
        onClick={() => handleAddVideoToWatchHistory(video._id)}
        className="relative flex flex-col md:flex-row mb-8 md:mb-3 lg:hover:bg-white/[0.1] rounded-xl md:p-4 scrollbar-hide"
      >
        <div className="relative flex shrink-0 h-48 md:h-28 lg:h-40 xl:h-48 w-full md:w-48 lg:w-64 xl:w-80 rounded-xl bg-slate-800 overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={video?.thumbnail}
            alt={video?.title}
          />
          {video?.duration && (
            <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 py-0.5 rounded">
              {`${video?.duration.toFixed(2)} mins`}
            </span>
          )}
        </div>
        <div className="flex flex-col ml-4 md:ml-6 mt-4 md:mt-0 overflow-hidden">
          <span className="text-lg md:text-2xl font-semibold line-clamp-2 text-white">
            {video?.title}
          </span>
          <span className="empty:hidden text-sm line-clamp-1 md:line-clamp-2 text-white/[0.7] md:pr-24 md:my-4">
            {video?.description}
          </span>
          <div className="hidden md:flex items-center">
            <div className="flex items-start mr-3">
              <div className="flex h-9 w-9 rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={
                    video?.owner?.avatar ||
                    "https://tse4.mm.bing.net/th?id=OIP.tZq4FbHI-2VuBSGkHjfyfAHaHa&pid=Api&P=0&h=180"
                  }
                  alt={video?.channelTitle}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold mt-2 text-white/[0.7] flex items-center">
                {video?.owner.username || "Unknown Channel"}
              </span>
              <div className="flex text-sm font-semibold text-white/[0.7] truncate overflow-hidden">
                <span>{`${abbreviateNumber(video?.views, 2)} views`}</span>
                <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                  .
                </span>
                <span className="truncate">{video?.createdAt}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MyVideosDisplay;
