import React, { useEffect } from "react";
import axiosInstance from "../utils/AxiosInstance";

const TestAPI = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/users/test");
        console.log(res.data);
        alert(res.data.message); // should alert "Backend is working!"
      } catch (error) {
        console.error("API call failed:", error);
        alert("API call failed! Check console for more info.");
      }
    };

    fetchData();
  }, []);

  return <div>✅ Backend Test: Check console or alert box for the response.</div>;
};

export default TestAPI;
