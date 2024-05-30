import React, { useState } from 'react'
import {AllPosts, CraetePost, InfoUserHome} from '../../ImportFile/index.jsx'
import PostForm from "./PostForm.jsx"
import PostList from "./PostList.jsx"
import "./StyleDefault.css"
export default function Default() {
  const [posts, setPosts] = useState([]);

  const addPost = (content, image) => {
    const newPost = { content, image: URL.createObjectURL(image) };
    setPosts([newPost, ...posts]);
  };
  return (
    <div className="container d-flex">
      <div className="row">
      <div className="col-md-8">
      {/* <div className="col-md-12"><CraetePost /></div>
      <div className="col-md-12"><AllPosts /></div> */}
      <div className="col-md-12">
      <PostForm addPost={addPost} />
      </div>
      <div className="col-md-12">
      <PostList posts={posts} />
      </div>
      </div>
      <div className="col-md-4">
      <InfoUserHome />
      </div>
      </div>
    </div>
  )
}

