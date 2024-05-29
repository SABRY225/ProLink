import React from 'react';
import { About, Follower, Friend, PostUser, Skills, UserInfo } from '../ImportFile/index';
import "./StyleProfile.css";

export default function Profile() {
  return (
    <div className="profile-container container text-center">
      <UserInfo />
      <div className="row profile-content">
        <div className="col-md-4 profile-sidebar">
          <About />
          <Skills />
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
