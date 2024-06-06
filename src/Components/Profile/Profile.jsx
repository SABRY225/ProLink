import React, { useEffect, useState } from 'react';
import { About, Follower, Friend, PostUser, Skills, UserInfo } from '../ImportFile/index';
import "./StyleProfile.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../../Redux/authSlice'; // Import your login action

export default function Profile() {
  const [data, setData] = useState({});
  const tok = useSelector((state) => state.auth.token);
  const dispatch = useDispatch(); // Get the dispatch function

  const getDataUser = async () => {
      try {
          const response = await axios.get('http://localhost:5292/api/User/get-Current-user', {
              headers: {
                  'Authorization': 'Bearer ' + tok,
                  "Content-Type": "application/json"
              }
          });
          setData(response.data);
          console.log(response.data);
      } catch (error) {
          console.log(error);
          if (error.response && error.response.status === 401) {
              dispatch(loginSuccess(""));
          }
      }
  };

  useEffect(() => {
      getDataUser();
  }, [tok]);

  const skills = data.skills || [];

  return (
    <div className="profile-container container text-center">
      <UserInfo 
        firstName={data.firstName} 
        lastName={data.lastName} 
        backImage={data.backImage} 
        profilePicture={data.profilePicture} 
        followersCount={data.followersCount} 
        jobTitle={data.jopTitle} 
      />
      <div className="row profile-content">
        <div className="col-md-4 profile-sidebar">
          <About description={data.description} />
          <Skills skills={skills} />
          <Friend />
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
