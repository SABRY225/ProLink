import React, { useEffect, useState } from 'react'
import {AllPosts, CraetePost, InfoUserHome} from '../../ImportFile/index.jsx'
import PostForm from "./PostForm.jsx"
import PostList from "./PostList.jsx"
import "./StyleDefault.css"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
export default function Default() {
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const tok = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const getDataUser = async () => {
      try {
          const { data } = await axios.get('http://localhost:5292/api/User/user-info', {
              headers: {
                  'Authorization': 'Bearer ' + tok,
                  "Content-Type": "application/json"
              }
          });
          setData(data);
      } catch (error) {
              setError('Failed to fetch user data.');
      } 
  };

  useEffect(() => {
      getDataUser();
  }, [tok]);

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
      <PostForm addPost={addPost} data={data} />
      </div>
      <div className="col-md-12">
      <PostList posts={posts} />
      </div>
      </div>
      <div className="col-md-4">
      <InfoUserHome data={data} />
      </div>
      </div>
    </div>
  )
}

