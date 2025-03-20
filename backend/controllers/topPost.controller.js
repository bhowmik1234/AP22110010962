import axios from "axios";

const TEST_URL = "http://20.244.56.144/test/"
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNDgyOTcxLCJpYXQiOjE3NDI0ODI2NzEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImM3MDE1NTdlLThlMDYtNGY0MS04YmQ0LWRhYjI5ODg3NzhkMSIsInN1YiI6ImJob3dtaWtfY2hhd2RhQHNybWFwLmVkdS5pbiJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiYzcwMTU1N2UtOGUwNi00ZjQxLThiZDQtZGFiMjk4ODc3OGQxIiwiY2xpZW50U2VjcmV0IjoicEFBeFd2QU9yalVzbW5oVyIsIm93bmVyTmFtZSI6IkJob3dtaWsiLCJvd25lckVtYWlsIjoiYmhvd21pa19jaGF3ZGFAc3JtYXAuZWR1LmluIiwicm9sbE5vIjoiQVAyMjExMDAxMDk2MiJ9.lVS7UlzkYj-1sJXWuLnScOTvY6Pp2z-8i-4P-BdQLjM"

const axiosConfig = {
    headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
    }
};

export const getTopPost = async (req, res) => { 
    try {
        const { type } = req.query;
        const usersResponse = await axios.get(`${TEST_URL}/users`, axiosConfig);
        const usersObj = usersResponse.data.users;
        const users = Object.keys(usersObj);

        let allPosts = [];

        await Promise.all(users.map(async (userId) => {
            const postsResponse = await axios.get(`${TEST_URL}users/${userId}/posts`, axiosConfig);
            const posts = postsResponse.data.posts || [];
            allPosts = allPosts.concat(posts);
        }));

        const commentCounts = {};

        await Promise.all(allPosts.map(async (post) => {
            const commentsResponse = await axios.get(`${TEST_URL}posts/${post.id}/comments`, axiosConfig);
            commentCounts[post.id] = commentsResponse.data.comments.length || 0;
        }));

        const maxComments = Math.max(...Object.values(commentCounts));
        const popularPosts = allPosts.filter(post => commentCounts[post.id] === maxComments).slice(0, 5);

        const latestPosts = allPosts
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);

        if (type === "latest") {
            return res.json({ latest: latestPosts });
        } else if (type === "popular") {
            return res.json({ popular: popularPosts });
        }

        res.json({ popular: popularPosts, latest: latestPosts });
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        res.status(500).json({ error: error.message });
    }
}