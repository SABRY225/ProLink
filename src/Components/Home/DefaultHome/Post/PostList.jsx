import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReactType = {
    LIKE: 0,
    DISLIKE: 1,
    LOVE: 2,
    HAHA: 3,
    WOW: 4,
    ANGRY: 5,
};

const reactionEmojis = {
    [ReactType.LIKE]: '👍',
    [ReactType.DISLIKE]: '😢',
    [ReactType.LOVE]: '❤️',
    [ReactType.HAHA]: '😂',
    [ReactType.WOW]: '😮',
    [ReactType.ANGRY]: '😡',
};

function PostList() {
    const [posts, setPosts] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const [comments, setComments] = useState({});
    const [followedUsers, setFollowedUsers] = useState([]);

    const getPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5292/api/Post/get-all', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setPosts(response.data);
        } catch (error) {
            toast.error("Failed to fetch posts");
            console.error(error);
        }
    };

    const handleFollowUser = async (userId) => {
        try {
            await axios.post(`http://localhost:5292/api/Follower/follow?userId=${userId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
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
            await axios.post(`http://localhost:5292/api/Post/add-comment?Postid=${postId}`, { content: comments[postId] || "" }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
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
            await axios.put(`http://localhost:5292/api/Post/update-comment?commentId=${commentId}`, { content }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            toast.success("Comment updated successfully");
            getPosts();
        } catch (error) {
            toast.error("Failed to update comment");
            console.error(error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:5292/api/Post/delete-comment?commentId=${commentId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            toast.success("Comment deleted successfully");
            getPosts();
        } catch (error) {
            toast.error("Failed to delete comment");
            console.error(error);
        }
    };

    const handleAddReact = async (postId, type) => {
        try {
            await axios.post(`http://localhost:5292/api/Post/add-react?postId=${postId}&type=${type}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            toast.success("React added successfully");
            getPosts();
        } catch (error) {
            if (error.response && error.response.data === 'PRO FEATURE ONLY') {
                toast.error("This feature is available for pro users only.");
            } else {
                toast.error("Failed to add react");
            }
            console.error(error);
        }
    };

    const handleDeleteReact = async (likeId) => {
        try {
            await axios.delete(`http://localhost:5292/api/Post/delete-react?likeId=${likeId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
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
            [postId]: value
        });
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
                        <div className="col-md-6 d-flex">
                            <div className="col-md-3">
                                <img
                                    src={post.user.profilePicture}
                                    alt="profile"
                                    style={{ width: '55px', height: '55px', borderRadius: '50%' }}
                                />
                            </div>
                            <div className="col-md-5 m-1 text-start" style={{ marginTop: "1rem" }}>
                                <div style={{ marginLeft: "0px" }}>
                                    {post.user.firstName + " " + post.user.lastName}
                                </div>
                                <div style={{ marginLeft: "0px", fontSize: "10px", color: "#5DADE2" }}>
                                    {post.user.jobTitle}
                                </div>
                                {/* Follow button */}
                                {!followedUsers.includes(post.user.id) &&
                                    <button onClick={() => handleFollowUser(post.user.id)}>Follow</button>
                                }
                            </div>
                        </div>
                        {/* Post content section */}
                        <div className="col-md-6">
                            <div className="col-md-12 d-flex text-center">
                                <p className='text-center' style={{ marginLeft: "1rem", marginTop: "1rem", fontSize: "18px", color: "#212F3D " }}>
                                    {post.description}
                                </p>
                            </div>
                            <div className="col-md-12">
                                {post.postImage ? (
                                    <img src={post.postImage} alt="Post" className="post__image" />
                                ) : (
                                    " "
                                )}
                            </div>
                            <div className="col-md-12">
                                <div className="comments">
                                    {post.comments.map((comment) => (
                                        <div key={comment.id} className="comment">
                                            <div className="col-md-3">
                                                <img
                                                    src={comment.user.profilePicture}
                                                    alt="profile"
                                                    style={{ width: '35px', height: '35px', borderRadius: '50%' }}
                                                />
                                            </div>
                                            <div className="col-md-9">
                                                <div>{comment.user.firstName + " " + comment.user.lastName}</div>
                                                <div>{comment.content}</div>
                                                <div>
                                                    <button onClick={() => handleUpdateComment(comment.id, prompt("Update comment:", comment.content))}>
                                                        Update
                                                    </button>
                                                    <button onClick={() => handleDeleteComment(comment.id)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <input
                                        type="text"
                                        value={comments[post.id] || ""}
                                        onChange={(e) => handleCommentChange(post.id, e.target.value)}
                                        placeholder="Add a comment"
                                    />
                                    <button onClick={() => handleAddComment(post.id)}>Add Comment</button>
                                </div>
                                <div className="reactions">
                                    {!post.isLiked ? (
                                        <div className="reaction-button">
                                            <button className="reaction-button">
                                                👍
                                            </button>
                                            <div className="reaction-options">
                                                <button onClick={() => handleAddReact(post.id, ReactType.LIKE)}>👍</button>
                                                <button onClick={() => handleAddReact(post.id, ReactType.LOVE)}>❤️</button>
                                                <button onClick={() => handleAddReact(post.id, ReactType.HAHA)}>😂</button>
                                                <button onClick={() => handleAddReact(post.id, ReactType.WOW)}>😮</button>
                                                <button onClick={() => handleAddReact(post.id, ReactType.DISLIKE)}>😢</button>
                                                <button onClick={() => handleAddReact(post.id, ReactType.ANGRY)}>😡</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button className="reaction-button" onClick={() => handleDeleteReact(post.likeId)}>
                                            {reactionEmojis[post.react.type]}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <ToastContainer />
        </div>
    );
}

export default PostList;
