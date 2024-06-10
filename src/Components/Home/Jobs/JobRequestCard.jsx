import React from "react";
import { NavLink } from "react-router-dom";
import { Image } from "react-bootstrap";
import axios from "axios";
import "./JobRequestCard.css";
import { useSelector } from "react-redux";

const JobRequestCard = ({ jobRequest }) => {
  const tok = useSelector((state) => state.auth.token);

  const { id, status, dateCreated, sender, cv } = jobRequest;

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

  const handleAcceptJob = async (id) => {
    try {
      console.log(`Accepting job request with ID: ${id}`);
      const response = await axios.put(
        `http://localhost:5292/api/JobReques/accept-jobRequest?jobRequestId=${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + tok,
          },
        }
      );
      console.log("Accept response:", response.data);
      // Optionally update state or refetch data to reflect changes
    } catch (error) {
      console.error("Error accepting job request:", error.response || error);
    }
  };

  const handleDeclineJob = async (id) => {
    try {
      console.log(`Declining job request with ID: ${id}`);
      const response = await axios.put(
        `http://localhost:5292/api/JobReques/decline-jobRequest?requestId=${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + tok,
          },
        }
      );
      console.log("Decline response:", response.data);
    } catch (error) {
      console.error("Error declining job request:", error.response || error);
    }
  };
  return (
    <div
      className={`job-request-card ${
        status === 1 ? "accepted" : status === 2 ? "denied" : ""
      }`}
    >
      <div className="">
        <div className="comment-card">
          <NavLink
            to="/profile"
            className="d-flex text-decoration-none text-black"
          >
            <div className="comment-header">
              <Image
                src={
                  sender.profilePicture
                }
                roundedCircle
                width={40}
                height={40}
                className="me-3"
              />
              <div>
                <h6 className="mb-0">
                  {sender.firstName} {sender.lastName}
                  <small className="px-3">
                    {calculateTimeDifference(dateCreated)}
                  </small>
                </h6>
                <small className="text-muted">
                  {sender.jopTitle}
                </small>
              </div>
            </div>
          </NavLink>

          <h2 className="cv-name">
            <a href={cv} rel="noopener noreferrer">
              View CV
            </a>
          </h2>

          <div className="comment-body">
            <small>I want to join your project.</small>
          </div>
        </div>
      </div>
      {status === 0 && (
        <div className="job-request-actions">
          <button className="accept-button" onClick={() => handleAcceptJob(id)}>
            Accept
          </button>
          <button className="deny-button" onClick={() => handleDeclineJob(id)}>
            Deny
          </button>
        </div>
      )}
      {status === 1 && <p className="status-message">Request Accepted</p>}
      {status === 2 && <p className="status-message">Request Declined</p>}
    </div>
  );
};

export default JobRequestCard;
