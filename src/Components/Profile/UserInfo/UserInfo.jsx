import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserInfo = ({
  firstName,
  lastName,
  backImage,
  profilePicture,
  followersCount,
  jobTitle,
  isFollowed,
  isFriend,
}) => {
  const jobTitleFromState = useSelector((state) => state.profile.jobTitle);
  const Name = `${firstName} ${lastName}`;
  const { id } = useParams();
  const tok = useSelector((state) => state.auth.token);
  console.log(id);
  const iduser = useSelector((state) => state.profile.id);
  console.log(iduser);


  const handleFollow = () => {
    console.log("Follow button clicked");
  };

  const handleUnfollow = () => {
    console.log("Unfollow button clicked");
  };

  const handleAddFriend = async() => {
    console.log("Add Friend button clicked");
    try {
      const res=await axios.post("http://localhost:5292/api/FriendRequest/send-friendRequest",{
        params:{userId:id},
        headers: {
            'Authorization': 'Bearer ' + tok,
        }
      })
      alert(res)
    } catch (error) {
      alert(error)
    }
  };

  const handleRemoveFriend = async() => {
    console.log("Add Friend button clicked");
    try {
      const res=await axios.delete("http://localhost:5292/api/FriendRequest/delete-friendRequest",{
        params:{friendId:id},
        headers: {
            'Authorization': 'Bearer ' + tok,
        }
      })
      alert(res)
    } catch (error) {
      alert(error)
    }
  };

  return (
    <>
      <div className="row">
        <img
          className="backImage"
          src={
            backImage
              ? backImage
              : "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg"
          }
          alt="backImage"
        />
      </div>
      <div className="row d-flex text-center">
        <div className="col-md-12">
          <img
            className="profilePicture"
            src={
              profilePicture
                ? profilePicture
                : "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg"
            }
            alt="profile"
          />
        </div>
        <div className="col-md-12 p-3">
          <h2>{Name}</h2>
        </div>
        <div className="col-md-12 p-2">
          <h4 style={{ color: "#ABB2B9" }}>{jobTitle || jobTitleFromState}</h4>
        </div>
        <div className="col-md-12 p-2">
          <h4 style={{ color: "#197BE3" }}>{followersCount} Followers</h4>
        </div>
        <div className="col-md-12">
          {
            id==iduser ?
            " ":<>
            {isFollowed ? (
            <button style={buttonStyle2} onClick={handleUnfollow}>Unfollow</button>
          ) : (
            <button style={buttonStyle} onClick={handleFollow}>Follow</button>
          )}
          {isFriend ? (
            <button style={buttonStyle2} onClick={handleRemoveFriend}>Remove Friend</button>
          ) : (
            <button style={buttonStyle} onClick={handleAddFriend}>Add Friend</button>
          )}
          <button style={buttonStyle}>Message</button></>
          }
        </div>
        <div className="col-md-12 p-2">
          <h4 style={{ color: "#566573" }}>
            <hr />
          </h4>
        </div>
      </div>
    </>
  );
};

const buttonStyle = {
  margin: '10px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '5px',
  border: '1px solid #197BE3',
  backgroundColor: '#197BE3',
  color: '#fff',
  outline: 'none',
  transition: 'background-color 0.3s ease',
};
const buttonStyle2 = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: '1px solid #E74C3C',
    backgroundColor: '#E74C3C',
    color: '#fff',
    outline: 'none',
    transition: 'background-color 0.3s ease',
  };
export default UserInfo;
