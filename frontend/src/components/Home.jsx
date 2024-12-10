import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const verifyUser = async () => {
    try {
      const token = sessionStorage.getItem("token");
      console.log(token);
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get("http://localhost:3001/auth/login/home", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return <div>Home</div>;
}
