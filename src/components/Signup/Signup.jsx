import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/contextApi";
import axiosInstance from "../../utils/AxiosInstance";
import { FadeLoader } from "react-spinners";
const Signup = () => {
  const {
    username,
    setUsername,
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    avatar,
    setAvatar,
    profilePicture,
    setProfilePicture,
    loading, // Add this to use the loading state from Context
    setLoading,
    // avatarPreview,
    // setAvatarPreview,Y
    //  profilePicturePreview,
    // setProfilePicturePreview,
    // avatarURL,
    // coverImageURL,
  } = useContext(Context);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [profilePicturePreview, setProfilePicturePreview] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = async () => {
    const newErrors = {};
    if (!username || /\s/.test(username)) {
      newErrors.username = "Username must not contain spaces.";
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is not valid.";
    }
    // if (!password || password.length < 6) {
    //   newErrors.password = "Password must be at least 6 characters long.";
    // }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) {
      return;
    }
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("fullname", fullName);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    if (profilePicture) {
      formData.append("coverImage", profilePicture);
    }

    // await axiosInstance
    //   .post("/users/register", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     const { data } = res.data;
    //     console.log("User registered:", data);
    //     console.log("Avatar URL:", data.avatar);
    //     setAvatar(data.avatar);
    //     if (data.coverImage) setProfilePicture(data.coverImage);
    //     console.log("Username", data.username);
    //     console.log("FullName:", data.fullname);
    //     console.log("email", data.email);
    //     navigate("/feed");
    //   })
    //   .catch((err) => {
    //     console.error("Signup error:", err);
    //   });

    const res = await axiosInstance.post("/users/register", formData);
    const { data } = res.data;
    console.log("User registered:", data);
    console.log("Avatar URL:", data.avatar);
    setAvatar(data.avatar);
    if (data.coverImage) setProfilePicture(data.coverImage);
    console.log("Username", data.username);
    console.log("FullName:", data.fullname);
    console.log("email", data.email);
    setLoading(false);
    navigate("/feed");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setProfilePicturePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className=" w-full h-screen flex justify-center items-center">
      {loading ? ( // Show loader if loading
        <div className="flex justify-center items-center h-full">
          <FadeLoader color="#3498db" loading={loading} />
        </div>
      ) : (
        <div className="w-full max-w-sm p-8 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-8">Sign Up</h2>
          <form onSubmit={handleSignup}>
            {/* Flex container to place avatar and profile picture side by side */}
            <div className="mb-6 flex justify-between">
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                <label className="block mb-2 text-sm font-medium">Avatar</label>
                <div className="w-24 h-24 relative">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover rounded-full border border-gray-600"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700 rounded-full border border-gray-600">
                      <span className="text-gray-400">No Avatar</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Profile Picture Section */}
              <div className="flex flex-col items-center">
                <label className="block mb-2 text-sm font-medium">
                  Profile Picture
                </label>
                <div className="w-24 h-24 relative">
                  {profilePicturePreview ? (
                    <img
                      src={profilePicturePreview}
                      alt="Profile Picture Preview"
                      className="w-full h-full object-cover rounded-full border border-gray-600"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700 rounded-full border border-gray-600">
                      <span className="text-gray-400">No Picture</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500 ${errors.username ? 'border-red-500' : ''}`"
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p> // Display username error
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500 ${errors.email ? 'border-red-500' : ''}`"
                placeholder="Enter your full name"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p> // Display email error
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mb-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none"
            >
              Sign Up
            </button>
            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400 hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
