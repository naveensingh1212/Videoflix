import React, { useContext } from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FadeLoader } from "react-spinners";

import { Context } from "../context/contextApi";
const VideoCard = ({ video }) => {
  const isFromDatabase = video?._id !== undefined;
  const { handleAddVideoToWatchHistory } = useContext(Context);
  return (
    <Link to={`/video/${isFromDatabase ? video._id : video?.videoId}`}>
      <div
        onClick={() =>
          handleAddVideoToWatchHistory(
            isFromDatabase ? video._id : video?.videoId
          )
        }
        className="flex flex-col mb-8"
      >
        <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={isFromDatabase ? video?.thumbnail : video?.thumbnail[0]?.url}
            alt={video?.title}
          />
          {(video?.lengthText || video?.duration) && (
            <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 py-0.5 rounded">
              {video?.lengthText
                ? video.lengthText
                : `${video?.duration.toFixed(2)} mins`}
            </span>
          )}
        </div>

        <div className="flex text-white mt-3">
          <div className="flex items-start">
            <div className="flex h-9 w-9 rounded-full overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={
                  (video?.channelThumbnail &&
                    video?.channelThumbnail[0]?.url) ||
                  "https://tse4.mm.bing.net/th?id=OIP.tZq4FbHI-2VuBSGkHjfyfAHaHa&pid=Api&P=0&h=180"
                }
                alt={video?.channelTitle}
              />
            </div>
          </div>
          <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-sm font-bold line-clamp-2">
              {video?.title}
            </span>
            <span className="text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center">
              {video?.channelTitle || "Unknown Channel"}
              {!isFromDatabase && video?.channelHandle && (
                <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
              )}
            </span>
            <div className="flex text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
              <span>{`${abbreviateNumber(
                video?.viewCount || video?.views,
                2
              )} views`}</span>
              <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                .
              </span>
              <span className="truncate">
                {video?.publishedTimeText ||
                  new Date(video?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
