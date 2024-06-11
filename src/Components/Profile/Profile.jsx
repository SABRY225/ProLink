import React, { useEffect, useState } from 'react';
import { About, Follower, Friend, PostUser, Skills, UserInfo } from '../ImportFile/index';
import "./StyleProfile.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../../Redux/authSlice'; // Import your login action
import { useParams } from "react-router-dom";
export default function Profile() {
  const [data, setData] = useState({});
  const [friends, setFriends] = useState([]);
  const tok = useSelector((state) => state.auth.token);
  const dispatch = useDispatch(); // Get the dispatch function
  const { id } = useParams();
  console.log('Route ID:', id);
  const getDataUser = async () => {
      try {
          const response = await axios.get(
            `http://localhost:5292/api/User/get-by-id`,
            {
              params: {id},
              headers: {
                Authorization: "Bearer " + tok,
                "Content-Type": "application/json",
              },
            }
          );
          const Friends = await axios.get('http://localhost:5292/api/Friend/get', {
              headers: {
                  'Authorization': 'Bearer ' + tok,
              }
          });
          setData(response.data);
          console.log(response.data);
          setFriends(Friends.data)
          console.log(Friends.data);
      } catch (error) {
          console.log(error);
          if (error.response && error.response.status === 401) {
              dispatch(loginSuccess(""));
          }
      }
  };

  useEffect(() => {
      getDataUser();
  }, [tok,id]);

  const skills = data.skills || [];
  console.log("data", data);
  return (
    <div className="profile-container container text-center">
      <UserInfo 
        firstName={data.firstName} 
        lastName={data.lastName} 
        backImage={data.backImage} 
        profilePicture={data.profilePicture} 
        followersCount={data.followersCount} 
        jobTitle={data.jopTitle}
        isFollowed={data.isFollowed}
        isFriend={data.isFriend}
      />
      <div className="row profile-content">
        <div className="col-md-4 profile-sidebar">
          <About description={data.description} />
          <Skills skills={skills} />
          <Friend friends={friends}/>
          <Follower />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-7 profile-main">
          <PostUser />
        </div>
      </div>
    </div>
  );
}
