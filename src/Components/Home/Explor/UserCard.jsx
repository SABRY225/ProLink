import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { Image } from "react-bootstrap";

function UserCard({ user }) {
  const { id } = useParams();
  console.log('Route ID:', id);
  console.log(user);

  return (
    <div className="d-flex justify-content-center my-3">
      <NavLink to={`/profileAccount/${user.id}`} className="user-card-link">
        <div className="user-card d-flex align-items-center">
          <Image
            src={user.profilePicture}
            roundedCircle
            width={70}
            height={70}
            className="me-3"
          />
          <div className="user-card-info">
            <h5 className="mb-1 card-user-name">
              {user.firstName} {user.lastName}
            </h5>
            <p className="text-muted mb-2 user-card-jobtitle">{user.jobTitle}</p>
            <p className="text-muted mb-2">{user.description}</p>
            <div className="user-card-stats">
              <span>{user.followersCount} Followers</span>
              <span>{user.rateCount} Ratings</span>
              <span>{user.rate}</span>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default UserCard;
