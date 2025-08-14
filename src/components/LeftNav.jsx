import React, { useContext } from "react";
import { Context } from "../context/contextApi.jsx";
import { categories } from "../utils/Constants.jsx";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive"; // Importing media query hook

const LeftNav = () => {
  const { selectedCategory, setSelectedCategory } = useContext(Context);
  const filteredCategories = categories.filter((category) =>
    [1, 2, 3].includes(category.id)
  );
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    navigate(`/feed/${categoryName}`);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      {/* Left Navigation for larger screens */}
      {!isMobile && (
        <div className="fixed top-16 left-0 h-[calc(100vh-64px)] w-17 bg-black text-white flex flex-col items-center py-4 space-y-8">
          {filteredCategories.map((category) => (
            <React.Fragment key={category.id}>
              <div
                className={`flex flex-col items-center cursor-pointer ${
                  selectedCategory === category.name ? "bg-gray-700" : ""
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="text-2xl mb-1">{category.icon}</div>
                <span className="text-xs">{category.name}</span>
              </div>
              {category.divider && <hr className="my-2 border-white/[0.2]" />}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Bottom Navigation for mobile devices */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-black text-white flex justify-around py-2 shadow-lg w-full z-50">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className={`flex flex-col items-center cursor-pointer ${
                selectedCategory === category.name ? "bg-gray-700" : ""
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="text-2xl mb-1">{category.icon}</div>
              <span className="text-xs">{category.name}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default LeftNav;
