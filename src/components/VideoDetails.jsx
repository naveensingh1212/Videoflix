import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import {
  AiOutlineLike,
  AiOutlinePlus,
  AiOutlineMinus,
  AiFillLike,
  AiOutlineComment,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import SuggestionVideoCard from "./SuggestionVideoCard";
import { Context } from "../context/contextApi";
import CommentsPage from "./CommentsPage";
import axiosInstance from "../utils/AxiosInstance.jsx";
import { FadeLoader } from "react-spinners";
import LeftNavMenuItems from "./LeftNavMenuItems.jsx";
import LeftNav from "./LeftNav.jsx";

const VideoDetails = () => {
  const [video, setVideo] = useState();
  const { id } = useParams();
  const { avatar, loading, setLoading, isSideBarVisible } = useContext(Context);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const isFromDatabase = video?._id !== undefined;

  const fetchRelatedVideos = async () => {
    try {
      setLoading(true);
      setVideo(null);
      // const response = await axios.get(
      //   `http://localhost:3000/api/v1/videos/related/${id}`
      // );
      const response = await axiosInstance.get(`/videos/related/${id}`);
      //  console.log("Related Videos data :", response.data);
      setRelatedVideos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const fetchVideoDetails = async () => {
    try {
      setLoading(true);
      setRelatedVideos([]);
      const response = await axiosInstance.get(`/videos/info/${id}`);
      console.log("Videos Details", response);
      setVideo(response.data.video);
      setIsLiked(response.data.isLiked);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      // console.log("cookies access from frontend", document.cookie);
      setLoading(true);
      const response = await axiosInstance.post(`/comment/add/${id}`, {
        content: newComment,
      });
      console.log("Comment added", response.data);
      //await setComments((prevComments) => [response.data, ...prevComments]);
      setNewComment("");
      getAllComments();

      setShowComments(true);
      setLoading(false);
    } catch (error) {
      console.error("Error commenting on video", error);
    }
  };

  const handleRemoveComment = async (commentId) => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(
        `/comment/deleteComment/${commentId}`
      );
      console.log("Comment Removed", response.data);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
      setLoading(false);
    } catch (error) {
      console.error("Error deleting comment", error);
    }
  };

  const handleUpdateComment = async (commentId, editedContent) => {
    try {
      setLoading(true);
      await axiosInstance.patch(`/comment/updateComment/${commentId}`, {
        content: editedContent,
      });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? { ...comment, content: editedContent }
            : comment
        )
      );
      getAllComments();
      setLoading(false);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
    } catch (error) {}
  };

  const getAllComments = async () => {
    try {
      setLoading(true);
      // console.log("My cookies are:", document.cookie);
      const response = await axiosInstance.get(`/comment/get/${id}`);
      console.log("All Comments", response.data.data);
      setComments(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(
        "Error fetching all comments",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await handleVideoLike(id);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error liking the video", error);
    }
  };

  const handleVideoLike = async (videoId) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`/like/video/${videoId}`);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log("Error liking the video", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRelatedVideos();
    fetchVideoDetails();
    getAllComments();
  }, [id]);
  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black ">
      {isSideBarVisible ? <LeftNavMenuItems /> : <LeftNav />}
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row ">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 ">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <FadeLoader color="#ffffff" />
            </div>
          ) : (
            <>
              <div className="sticky top-[56px] h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0 ">
                {isFromDatabase ? (
                  <video
                    src={video.videoFile}
                    controls
                    width="100%"
                    height="100%"
                    style={{ backgroundColor: "#000" }}
                    autoPlay
                  />
                ) : (
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${id}`}
                    controls
                    width="100%"
                    height="100%"
                    playing={true}
                  />
                )}
              </div>
              <div className=" overflow-y-auto text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
                {video?.title}
              </div>
              <div className="flex justify-between flex-col md:flex-row mt-4">
                <div className="flex">
                  <div className="flex items-start">
                    <div className="flex h-11 w-11 rounded-full overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={
                          isFromDatabase
                            ? video.owner.avatar
                            : (video?.channelThumbnail &&
                                video.channelThumbnail[0]?.url) ||
                              "https://tse4.mm.bing.net/th?id=OIP.tZq4FbHI-2VuBSGkHjfyfAHaHa&pid=Api&P=0&h=180"
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col ml-3">
                    <div className="text-white text-md font-semibold flex items-center">
                      {isFromDatabase
                        ? video.owner.fullname
                        : video?.channelTitle || "Unknown Channel"}
                      {!isFromDatabase && video?.channelHandle && (
                        <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                      )}
                    </div>
                    <div className="text-white/[0.7] text-sm">
                      {video?.author?.stats?.subscribersText}
                    </div>
                  </div>
                </div>
                <div className="flex text-white mt-4 md:mt-0">
                  <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                    <div
                      onClick={handleClick}
                      className="cursor-pointer flex items-center"
                    >
                      {isLiked ? (
                        <AiFillLike className="text-2xl text-blue-500 mr-2" />
                      ) : (
                        <AiOutlineLike className="text-2xl text-white mr-2" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                    {`${abbreviateNumber(
                      isFromDatabase ? video.views : video?.viewCount || 0,
                      2
                    )} Views`}
                  </div>
                </div>
              </div>
              {/* Toggle Icons */}
              <div className="flex mt-4 space-x-4">
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="text-white hover:text-gray-400 flex items-center"
                >
                  <AiOutlineInfoCircle className="text-2xl" />
                  <span className="ml-2 text-sm">
                    {showDescription ? "Hide Description" : "Show Description"}
                  </span>
                </button>
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="text-white hover:text-gray-400 flex items-center"
                >
                  <AiOutlineComment className="text-2xl" />
                  <span className="ml-2 text-sm">
                    {showComments ? "Hide Comments" : "Show Comments"}
                  </span>
                </button>
              </div>
              {/* Description Section */}
              {showDescription && (
                <div className="text-white mt-4">
                  <h3 className="text-lg font-semibold">Description</h3>
                  <p className="mt-2 text-sm text-white/[0.7]">
                    {video?.description || "No description available."}
                  </p>
                </div>
              )}
              {/* Comment Section */}
              {showComments && (
                <div className="text-white mt-6">
                  <h3 className="text-lg font-semibold">Comments</h3>
                  <div className="mt-2">
                    {comments.length === 0 ? (
                      <p className="text-white/[0.7]">No comments yet.</p>
                    ) : (
                      comments.map((comment) => (
                        <CommentsPage
                          key={comment._id}
                          comment={comment}
                          onUpdateComment={handleUpdateComment}
                          onRemoveComment={handleRemoveComment}
                        />
                      ))
                    )}
                  </div>
                  <div className="flex mt-4">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-grow p-2 rounded-l-md bg-white/[0.1] text-white"
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                      onClick={handleAddComment}
                      className="p-2 rounded-r-md bg-green-500 text-white"
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
              )}
              )
            </>
          )}
        </div>
        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px] scrollbar-hide">
          {relatedVideos.map((item, index) => {
            if (item && item.type === "video")
              return <SuggestionVideoCard key={index} video={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
