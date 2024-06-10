import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setIdOtherUser } from "../../../Redux/profileSlice";
function UserCard({ user }) {
  console.log(user);
  const idCerrentUser = useSelector((state) => state.profile.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelProfile = () => {
    if (user.id == idCerrentUser) {
      navigate("/profile");
      dispatch(setIdOtherUser(user.id));
    } else {
      dispatch(setIdOtherUser(user.id));
      navigate("/ProfileUser");
    }
  }
  
  return (
    <div className="d-flex justify-content-center my-3">
      <div onClick={handelProfile} className="user-card-link">
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
            <p className="text-muted mb-2 user-card-jobtitle">{user.jopTitle}</p>
            <p className="text-muted mb-2">{user.description}</p>
            <div className="user-card-stats">
              <span>{user.followersCount} Followers</span>
              <span>{user.rateCount} Ratings</span>
              <span>{user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;