import React from "react";
import { useContext } from "react";
import { Context } from "../context/contextApi";
import LeftNavMenuItems from "./LeftNavMenuItems";
import LeftNav from "./LeftNav";
import Header from "./Header";
import { Navigate, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoFeed from "./VideoFeed";
import History from "./History";
import LikeHandling from "./LikeHandling";
import MyVideos from "./MyVideos";
const Feed = () => {
  const { isSideBarVisible, setSidebarVisible, toggleSideBar } =
    useContext(Context);
  const { selectedCategory, setSelectedCategory } = useContext(Context);
  return (
    <div className="flex h-full scrollbar-hide">
      {/* <Header /> */}
      {isSideBarVisible ? <LeftNavMenuItems /> : <LeftNav />}
      <Routes>
        <Route path="/" element={<Navigate to="/feed/Home" />} />
        <Route path="/:categoryName" element={<VideoFeed />} />
        <Route path="/History" element={<History />} />
        <Route path="/LikedVideos" element={<LikeHandling />} />
        <Route path="/MyVideos" element={<MyVideos />} />
      </Routes>
    </div>
  );
};

export default Feed;
