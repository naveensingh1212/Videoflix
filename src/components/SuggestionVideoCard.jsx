import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill, BsTypeH5 } from "react-icons/bs";
import { FadeLoader } from "react-spinners";
const SuggestionVideoCard = ({ video }) => {
  const isFromDatabase = video?._id !== undefined;

  // return <h5 className="bg-cyan-600">SuggestionVideos</h5>;
  return (
    <Link to={`/video/${isFromDatabase ? video._id : video?.videoId}`}>
      <div className="flex mb-3 overflow-hidden">
        <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl bg-slate-800 overflow-hidden">
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
          <div className="text-sm lg:text-xs xl:text-sm font-bold line-clamp-2 text-white">
            <span className="text-sm lg:text-xs xl:text-sm font-bold line-clamp-2 text-white">
              {video?.title}
            </span>
            <span className="text-[12px] lg:text-[10px] xl:text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center">
              {video?.channelTitle || "Unknown Channel"}
              {!isFromDatabase && video?.channelHandle && (
                <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
              )}
            </span>
            <div className="flex text-[12px] lg:text-[10px] xl:text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
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

export default SuggestionVideoCard;
