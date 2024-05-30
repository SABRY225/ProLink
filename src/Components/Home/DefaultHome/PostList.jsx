import React from 'react';

const PostList = ({ posts }) => {
    return (
        <div className="post-list">
            {posts.map((post, index) => (
                <div key={index} className="post">
                    <p>{post.content}</p>
                    {post.image && <img src={post.image} alt="Post" className="post__image" />}
                </div>
            ))}
        </div>
    );
};

export default PostList;
