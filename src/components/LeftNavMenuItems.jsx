import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/contextApi";
import { categories } from "../utils/Constants";
const LeftNavMenuItems = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    isSideBarVisible,
    setSidebarVisible,
  } = useContext(Context);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    setSidebarVisible(!isSideBarVisible);
    setSelectedCategory(categoryName);
    navigate(`/feed/${categoryName}`);
  };
  return (
    <div
      className="flex flex-col bg-black text-white h-[calc(100vh-64px)] w-64 fixed top-16 left-0 py-4 overflow-y-auto z-10"
      style={{ overflow: "hidden" }}
    >
      {categories.map((category, index) => (
        <React.Fragment key={category.id}>
          <div
            className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-700 ${
              selectedCategory === category.name ? "bg-gray-700" : ""
            }`}
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="text-xl mr-4">{category.icon}</div>
            <p>{category.name}</p>
          </div>
          {category.divider && <hr className="my-2 border-white/[0.2]" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default LeftNavMenuItems;
