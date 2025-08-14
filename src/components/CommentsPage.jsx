import React, { useState, useContext } from "react";
import { AiOutlineMinus, AiOutlineEdit, AiOutlineLike } from "react-icons/ai";
import { FaThumbsUp } from "react-icons/fa"; // For like button effect
import axios from "axios";
import { Context } from "../context/contextApi";
const CommentsPage = ({ comment, onUpdateComment, onRemoveComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [likes, setLikes] = useState(comment.likes || 0);
  // const [hasLiked, setHasLiked] = useState(false);
  const { avatar, fullName } = useContext(Context);

  const handleUpdate = () => {
    onUpdateComment(comment._id, editedContent);
    setIsEditing(false);
  };

  const handleRemove = () => {
    onRemoveComment(comment._id);
  };

  return (
    <div className="flex flex-col md:flex-row items-start mb-4 p-4 bg-gray-800 rounded-md">
      <div className="flex items-start space-x-3">
        <img
          src={comment.owner?.avatar || "https://via.placeholder.com/50"}
          alt={comment.owner?.fullname || "User Avatar"}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-grow">
          {isEditing ? (
            <div className="flex flex-col md:flex-row items-start">
              <input
                type="text"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="p-2 rounded-md bg-white/[0.1] text-white flex-grow"
              />
              <button
                onClick={handleUpdate}
                className="ml-2 p-2 rounded-md bg-blue-500 text-white"
              >
                Update
              </button>
            </div>
          ) : (
            <div>
              <p className="text-white font-semibold">
                {comment.owner?.fullname || "Anonymous"}
              </p>
              <p className="text-gray-400 text-sm">{comment.content}</p>
              <p className="text-gray-500 text-xs mt-1">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          )}
          <div className="flex items-center space-x-3 mt-2">
            <button
            // onClick={handleLike}
            // className={`flex items-center text-white ${
            //   hasLiked ? "text-yellow-400" : "text-gray-300"
            // }`}
            >
              <FaThumbsUp
              // className={`transition-transform duration-300 ${
              //   hasLiked ? "scale-125" : ""
              // }`}
              />
              <span className="ml-1">{likes}</span>
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-yellow-500"
            >
              <AiOutlineEdit />
            </button>
            <button onClick={handleRemove} className="text-red-500">
              <AiOutlineMinus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsPage;
