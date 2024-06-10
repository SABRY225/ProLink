import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

const ReactType = {
  LIKE: 0,
  DISLIKE: 1,
  LOVE: 2,
  HAHA: 3,
  WOW: 4,
  ANGRY: 5,
};

const reactionEmojis = {
  [ReactType.LIKE]: "👍",
  [ReactType.DISLIKE]: "😢",
  [ReactType.LOVE]: "❤️",
  [ReactType.HAHA]: "😂",
  [ReactType.WOW]: "😮",
  [ReactType.ANGRY]: "😡",
};

Modal.setAppElement("#root");

function PostList() {
  const iduser = useSelector((state) => state.profile.id);
  const [posts, setPosts] = useState([]);
  const [com, setCom] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [comments, setComments] = useState({});
  const [followedUsers, setFollowedUsers] = useState([]);
  const [openOptionsPostId, setOpenOptionsPostId] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState("");

  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5292/api/Post/get-all", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setPosts(response.data);
    } catch (error) {
      toast.error("Failed to fetch posts");
      console.error(error);
    }
  };

  const comFun = () => {
    setCom(!com);
  };

  const handleFollowUser = async (userId) => {
    try {
      await axios.post(
        `http://localhost:5292/api/Follower/follow?userId=${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("User followed successfully");
      setFollowedUsers([...followedUsers, userId]);
      getPosts(); // Update posts after following a user
    } catch (error) {
      toast.error("Failed to follow user");
      console.error(error);
    }
  };

  const handleAddComment = async (postId) => {
    try {
      await axios.post(
        `http://localhost:5292/api/Post/add-comment?Postid=${postId}`,
        { content: comments[postId] || "" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Comment added successfully");
      setComments({ ...comments, [postId]: "" });
      getPosts();
    } catch (error) {
      toast.error("Failed to add comment");
      console.error(error);
    }
  };

  const handleUpdateComment = async (commentId, content) => {
    try {
      await axios.put(
        `http://localhost:5292/api/Post/update-comment?commentId=${commentId}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Comment updated successfully");
      getPosts();
    } catch (error) {
      toast.error("Failed to update comment");
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:5292/api/Post/delete-comment?commentId=${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Comment deleted successfully");
      getPosts();
    } catch (error) {
      toast.error("Failed to delete comment");
      console.error(error);
    }
  };

  const handleAddReact = async (postId, type) => {
    try {
      await axios.post(
        `http://localhost:5292/api/Post/add-react?postId=${postId}&type=${type}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("React added successfully");
      getPosts();
    } catch (error) {
      if (error.response && error.response.data === "PRO FEATURE ONLY") {
        toast.error("This feature is available for pro users only.");
      } else {
        toast.error("Failed to add react");
      }
      console.error(error);
    }
  };

  const handleDeleteReact = async (likeId) => {
    try {
      await axios.delete(
        `http://localhost:5292/api/Post/delete-react?likeId=${likeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("React deleted successfully");
      getPosts();
    } catch (error) {
      toast.error("Failed to delete react");
      console.error(error);
    }
  };

  const handleCommentChange = (postId, value) => {
    setComments({
      ...comments,
      [postId]: value,
    });
  };

  const openEditModal = (post) => {
    setEditPostId(post.id);
    setEditDescription(post.description);
    setEditImage(post.postImage);
    setEditModalIsOpen(true);
  };

  const handleEditPost = async () => {
    try {
      await axios.put(
        `http://localhost:5292/api/Post?id=${editPostId}`,
        { description: editDescription, postImage: editImage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Post updated successfully");
      setEditModalIsOpen(false);
      getPosts();
    } catch (error) {
      toast.error("Failed to update post");
      console.error(error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(
        `http://localhost:5292/api/Post?id=${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Post deleted successfully");
      getPosts();
    } catch (error) {
      toast.error("Failed to delete post");
      console.error(error);
    }
  };

  const toggleOptions = (postId) => {
    setOpenOptionsPostId((prev) => (prev === postId ? null : postId));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post.id} className="col-12 post">
          <div className="col-md-12">
            {/* User profile section */}
            <div className="col-md-12 d-flex">
              <div className="col-md-1 mx-3">
                <img
                  src={post.user.profilePicture}
                  alt="profile"
                  style={{ width: "55px", height: "55px", borderRadius: "50%" }}
                />
              </div>
              <div
                className="w-100 m-1 text-start d-flex justify-content-between"
                style={{ marginTop: "1rem" }}
              >
                <div className="d-block flex-col">
                  <div style={{ marginLeft: "0px" }}>
                    {post.user.firstName + " " + post.user.lastName}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      marginLeft: "0px",
                      fontSize: ".8rem",
                      color: "#5DADE2",
                    }}
                  >
                    {post.user.jopTitle}
                  </div>
                </div>
                <div className="post-options">
                  {iduser === post.user.id && (
                    <>
                      <button
                        className="options-button"
                        onClick={() => toggleOptions(post.id)}
                      >
                        ⋮
                      </button>
                      {openOptionsPostId === post.id && (
                        <div className="options-menu">
                          <button
                            className="edit-post"
                            onClick={() => openEditModal(post)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-post"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </>
                  )}
                  {!post.isUserFollowed && iduser !== post.user.id && (
                    <button
                      className="btn"
                      style={{ color: "#5DADE2" }}
                      onClick={() => handleFollowUser(post.user.id)}
                    >
                      Follow
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/* Post content section */}
            <div className="col-md-12">
              <div className="col-md-12 d-flex text-decoration-none align-items-start">
                <p
                  className="text-center"
                  style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    fontSize: "18px",
                    color: "#212F3D ",
                  }}
                >
                  {post.description}
                </p>
              </div>
              <div className="col-md-12">
                {post.postImage ? (
                  <img
                    src={post.postImage}
                    alt="Post"
                    className="img-fluid px-2"
                  />
                ) : (
                  " "
                )}
              </div>
              <hr />
              <div className="small d-flex justify-content-start">
                <div className="reactions">
                  {!post.isLiked ? (
                    <div className="reaction-button">
                      <button className="reaction-button">
                        <a href="#!" className="d-flex align-items-center me-3">
                          <i className="far fa-comment-dots me-2" />
                          <p className="mb-0">Like</p>
                        </a>
                      </button>
                      <div className="reaction-options">
                        <button
                          onClick={() =>
                            handleAddReact(post.id, ReactType.LIKE)
                          }
                        >
                          👍
                        </button>
                        <button
                          onClick={() =>
                            handleAddReact(post.id, ReactType.LOVE)
                          }
                        >
                          ❤️
                        </button>
                        <button
                          onClick={() =>
                            handleAddReact(post.id, ReactType.HAHA)
                          }
                        >
                          😂
                        </button>
                        <button
                          onClick={() => handleAddReact(post.id, ReactType.WOW)}
                        >
                          😮
                        </button>
                        <button
                          onClick={() =>
                            handleAddReact(post.id, ReactType.DISLIKE)
                          }
                        >
                          😢
                        </button>
                        <button
                          onClick={() =>
                            handleAddReact(post.id, ReactType.ANGRY)
                          }
                        >
                          😡
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="reaction-button"
                      onClick={() => handleDeleteReact(post.likeId)}
                    >
                      {reactionEmojis[post.react.type]}
                    </button>
                  )}
                </div>
                <a
                  href="#!"
                  className="d-flex align-items-center me-3"
                  onClick={() => comFun()}
                >
                  <i className="far fa-comment-dots me-2" />
                  <p className="mb-0">Comment</p>
                </a>
              </div>

              {com && (
                <div className="col-md-12">
                  <div className="comments col-md-12">
                    {post.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="comment col-md-12 d-block"
                      >
                        <div className="col-md-12 d-flex">
                          <img
                            src={comment.user.profilePicture}
                            alt="profile"
                            style={{
                              width: "35px",
                              height: "35px",
                              borderRadius: "50%",
                            }}
                          />
                          <div className="mx-2 justify-content-center align-items-center">
                            {comment.user.firstName +
                              " " +
                              comment.user.lastName}
                          </div>
                        </div>
                        <br />
                        <div
                          className="col-md-12 "
                          style={{ marginTop: "-25px" }}
                        >
                          <div
                            className="justify-content-start text-start mx-5 p-2 rounded-3"
                            style={{ backgroundColor: "#e4e5e6" }}
                          >
                            {comment.content}
                          </div>
                          <div>
                            <button
                              onClick={() =>
                                handleUpdateComment(
                                  comment.id,
                                  prompt("Update comment:", comment.content)
                                )
                              }
                              className="btn btn-outline-primary"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="btn btn-outline-primary"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <input
                      className="form-control"
                      id="textAreaExample"
                      type="text"
                      value={comments[post.id] || ""}
                      onChange={(e) =>
                        handleCommentChange(post.id, e.target.value)
                      }
                      placeholder="Add a comment"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="btn btn-primary btn-sm my-2"
                    >
                      Add Comment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <ToastContainer />
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
        contentLabel="Edit Post"
      >
        <h2>Edit Post</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditPost();
          }}
        >
          <div className="form-group">
            <label htmlFor="editDescription">Description</label>
            <textarea
              id="editDescription"
              className="form-control"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="editImage">Image URL</label>
            <input
              type="text"
              id="editImage"
              className="form-control"
              value={editImage}
              onChange={(e) => setEditImage(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setEditModalIsOpen(false)}
          >
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default PostList;
