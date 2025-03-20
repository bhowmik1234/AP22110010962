import axios from "axios";

const TEST_URL = "http://20.244.56.144/test/"


export const getTopPost = async (req, res) => { 
    try {
        const response = await axios.get(`${TEST_URL}/users`, axiosConfig);
        const users = response.data;
        let allPosts = [];
        
        for (const user of users) {
            const postsResponse = await axios.get(`${TEST_URL}/${user.id}/posts`, axiosConfig);
            allPosts.push(...postsResponse.data);
        }

        const postCommentCounts = await Promise.all(allPosts.map(async (post) => {
            const commentsResponse = await axios.get(`${TEST_URL}/${post.id}/comments`, axiosConfig);
            return { ...post, commentCount: commentsResponse.data.length };
        }));

        const maxComments = Math.max(...postCommentCounts.map(post => post.commentCount), 0);
        const popularPosts = postCommentCounts.filter(post => post.commentCount === maxComments);

        const latestPosts = allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

        res.json({
            popular: popularPosts,
            latest: latestPosts
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}