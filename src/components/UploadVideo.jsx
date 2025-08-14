import React, { useState, useContext } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/contextApi";
import { FadeLoader } from "react-spinners";
import LeftNavMenuItems from "./LeftNavMenuItems.jsx";
import LeftNav from "./LeftNav.jsx";
const UploadVideo = () => {
  const [thumbnailPreview, setthumbnailPreview] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const {
    videoCategory,
    setVideoCategory,
    type,
    setVideoType,
    title,
    setTitle,
    description,
    setDescription,
    thumbnail,
    setThumbnail,
    videoFile,
    setVideoFile,
    duration,
    setDuration,
    loading,
    setLoading,
  } = useContext(Context);
  const navigate = useNavigate();
  const { isSideBarVisible } = useContext(Context);
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("category", videoCategory);
    formData.append("description", description);
    if (thumbnail) formData.append("thumbnail", thumbnail);
    if (videoFile) formData.append("videoFile", videoFile);

    await axiosInstance
      .post("/videos/publishVideo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        const { data } = res.data;
        console.log("Video Uploaded", data);
        console.log("Thumbnail URL:", data.thumbnail);
        console.log("Category", data.category);
        console.log("type", data.type);
        console.log("Video url", data.videoFile);
        setThumbnail(data.thumbnail);
        setVideoFile(data.videoFile);
        setDuration(data.duration);
        setUploadSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error uploading Video", err);
      });
  };

  const handleThumbnail = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setthumbnailPreview(URL.createObjectURL(file));
    }
  };
  const handleVideoFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-6">
      {isSideBarVisible ? <LeftNavMenuItems /> : <LeftNav />}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <FadeLoader color="#3498db" loading={loading} />
          </div>
        ) : uploadSuccess ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              Video Uploaded Successfully!
            </h2>
            <button
              onClick={() => navigate("/feed/Home")}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Feed
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center mb-4">
              Upload Video
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={videoCategory}
                  onChange={(e) => setVideoCategory(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="music">Music</option>
                  <option value="education">Education</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="movies">Movies</option>
                  <option value="Gaming">Gaming</option>
                  <option value="news">News</option>
                  <option value="sports">Sports</option>
                  <option value="podcast">Podcasts</option>
                  <option value="shopping">Shopping</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setVideoType(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Type</option>
                  <option value="video">Video</option>
                  <option value="Shorts">Shorts</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Thumbnail
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnail}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {thumbnailPreview && (
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-md"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Video File
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoFile}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Upload Video
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadVideo;
