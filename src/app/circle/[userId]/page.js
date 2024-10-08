"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const { userId } = params;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post("/api/user/token", {
          userId,
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (error) {
    return (
      <div>
        {userId} Error occurred: {error.message}
      </div>
    );
  }

  return (
    <div>
      {userDetails ? (
        <div>User Details: {JSON.stringify(userDetails)}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
