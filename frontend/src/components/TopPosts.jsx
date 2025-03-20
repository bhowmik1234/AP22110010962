import React, { useEffect, useState } from "react";
// import "./TopPosts.css";

const TopPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3001/goMart/users");
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        
        // Transform API response to include an image (since API doesn't provide it)
        const transformedPosts = data.map((user) => ({
          id: user.id,
          username: user.name.replace(/\s+/g, "_").toLowerCase(), // Format username
          title: `New post by ${user.name}`,
          image: `https://lh7-us.googleusercontent.com/if40gtl1eUNNl92f1YN87mMwhXCYKPaRSiGVIdl3pQ-ptb-7V8kCRdJL4jwm49C1YyXRfhEYWFnrc5oQ4DYq4CnY6Gx_OfdbGCCWUVE3-BBWvGrdL7oV5k7btX7N1sIvYyKPVRm2OrDguiNhTqhGK9c`, // Placeholder image
        }));

        setPosts(transformedPosts);
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
      <h2 className="title">🔥 Top Posts</h2>

      {loading && <p className="loading">Loading posts...</p>}
      {error && <p className="error">{error}</p>}

      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <img src={post.image} alt="Post" className="post-image" />
            <div className="post-content">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-user">@{post.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPosts;
