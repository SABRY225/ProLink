import React from "react";
import { NavLink } from "react-router-dom";
import { Image } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

const FriendRequestCard = ({ request }) => {
  const token = useSelector((state) => state.auth.token);
  const { id, dateSent, status, sender } = request;

  const calculateTimeDifference = (createdAt) => {
    const currentTime = new Date();
    const createdTime = new Date(createdAt);
    const difference = Math.abs(currentTime - createdTime);

    const minutes = Math.floor(difference / 60000);
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours}h`;
    }
    const days = Math.floor(hours / 24);
    if (days < 2) {
      return `${days}d`;
    }
    return createdTime.toLocaleDateString();
  };

  const handleAcceptFriendRequest = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5292/api/FriendRequest/accept-friendRequest?friendRequestId=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Friend request accepted:", response.data);
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleDeclineFriendRequest = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5292/api/FriendRequest/decline-friendRequest?friendId=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Friend request declined:", response.data);
      // Optionally update state or refetch data to reflect changes
    } catch (error) {
      console.error("Error declining friend request:", error.response?.data || error.message);
    }
  };

  return (
    <div className={`friend-request-card ${status === 1 ? "accepted" : status === 2 ? "denied" : ""}`}>
      <div className="card-content">
        <div className="comment-card">
          <NavLink to={`/profile/${sender?.id}`} className="d-flex text-decoration-none text-black">
            <div className="comment-header">
              <Image
                src={sender?.profilePicture || "https://bootdey.com/img/Content/avatar/avatar5.png"}
                roundedCircle
                width={40}
                height={40}
                className="me-3"
              />
              <div>
                <h6 className="mb-0">
                  {sender?.firstName} {sender?.lastName}
                  <small className="px-3">{calculateTimeDifference(dateSent)}</small>
                </h6>
                <small className="text-muted">{sender?.jobTitle || "No Job Title"}</small>
              </div>
            </div>
          </NavLink>
          <div className="comment-body">
            <small>Sent you a friend request.</small>
          </div>
        </div>
      </div>
      {status === 0 && (
        <div className="friend-request-actions">
          <button className="accept-button" onClick={handleAcceptFriendRequest}>
            Accept
          </button>
          <button className="deny-button" onClick={handleDeclineFriendRequest}>
            Deny
          </button>
        </div>
      )}
      {status === 1 && <p className="status-message">Request Accepted</p>}
      {status === 2 && <p className="status-message">Request Declined</p>}
    </div>
  );
};

export default FriendRequestCard;
