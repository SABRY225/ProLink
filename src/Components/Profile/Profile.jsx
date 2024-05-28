import React from 'react'
import { About, Follower, Friend, PostUser, Skills, UserInfo } from '../ImportFile/index'
import "./StyleProfile.css"
export default function Profile() {
  return (
    <div className="container d-flex text-center">
        <UserInfo />
        <div className="row">
          <div className="col-md-4">
            <About />
            <Skills />
            <Friend />
            <Follower />
          </div>
          <div className="col-md-6">
            <PostUser />
          </div>
        </div>
    </div>
  )
}

