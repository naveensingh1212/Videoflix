import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header";
import Feed from "./components/Feed";
import SearchResult from "./components/SearchResult";
import VideoDetails from "./components/VideoDetails";
import { AppContext } from "./context/contextApi";
import UploadVideo from "./components/UploadVideo.jsx";
import TestAPI from "./components/TestAPI";

const App = () => {
  return (
    <AppContext>
      <BrowserRouter>
        <RouteHandler />
      </BrowserRouter>
    </AppContext>
  );
};

<Route path="/test" element={<TestAPI />} />


// Component to manage routes
const RouteHandler = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/feed" />} />
        <Route path="/feed/*" element={<Feed />} />
        <Route path="/searchResult/:searchQuery" element={<SearchResult />} />
        <Route path="/video/:id" element={<VideoDetails />} />
        <Route path="/upload" element={<UploadVideo />} />
        <Route path="/test" element={<TestAPI />} />  {}
      </Routes>
    </>
  );
};
``



  
export default App;
