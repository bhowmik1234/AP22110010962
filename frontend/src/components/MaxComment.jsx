import React, { useEffect, useState } from "react";


const MaxComment = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3001/goMart/posts?type=popular");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        
        const data = await response.json();
        
        // Extract "popular" posts from the response
        if (data.popular && Array.isArray(data.popular)) {
          const transformedPosts = data.popular.map((post) => ({
            id: post.id,
            userid: post.userid,
            content: post.content,
            image: `https://lh7-us.googleusercontent.com/if40gtl1eUNNl92f1YN87mMwhXCYKPaRSiGVIdl3pQ-ptb-7V8kCRdJL4jwm49C1YyXRfhEYWFnrc5oQ4DYq4CnY6Gx_OfdbGCCWUVE3-BBWvGrdL7oV5k7btX7N1sIvYyKPVRm2OrDguiNhTqhGK9c`, // Random image for each post
          }));

          setPosts(transformedPosts);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="top-posts-container">
      <h2 className="title">🔥 Trending Posts</h2>

      {loading && <p className="loading">Loading posts...</p>}
      {error && <p className="error">{error}</p>}

      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <img src={post.image} alt="Post" className="post-image" />
            <div className="post-content">
              <h3 className="post-title">{post.content}</h3>
              <p className="post-user">User ID: {post.userid}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaxComment;
