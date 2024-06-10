import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import FriendRequestCard from "./FriendRequestCard";
import "./Style.css";

function Friends() {
  const tok = useSelector((state) => state.auth.token);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5292/api/FriendRequest/Get-friendRequests",
          {
            headers: {
              Authorization: `Bearer ${tok}`,
            },
          }
        );
        setFriendRequests(response.data);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };

    fetchFriendRequests();
  }, [tok]);

  const acceptAllFriendRequests = async () => {
    try {
      await axios.put(
        "http://localhost:5292/api/FriendRequest/accept-all-friendRequests",
        {},
        {
          headers: {
            Authorization: `Bearer ${tok}`,
          },
        }
      );
      // Optionally refetch data or update state to reflect changes
      // fetchFriendRequests();
    } catch (error) {
      console.error("Error accepting all friend requests:", error);
    }
  };

  return (
    <div>
      <button onClick={acceptAllFriendRequests}>Accept All</button>
      {friendRequests.map((request) => (
        <FriendRequestCard key={request.id} request={request} />
      ))}
    </div>
  );
}

export default Friends;
