import axios from "axios";

const TEST_URL = "http://20.244.56.144/test/"
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNDg2MTY0LCJpYXQiOjE3NDI0ODU4NjQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImM3MDE1NTdlLThlMDYtNGY0MS04YmQ0LWRhYjI5ODg3NzhkMSIsInN1YiI6ImJob3dtaWtfY2hhd2RhQHNybWFwLmVkdS5pbiJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiYzcwMTU1N2UtOGUwNi00ZjQxLThiZDQtZGFiMjk4ODc3OGQxIiwiY2xpZW50U2VjcmV0IjoicEFBeFd2QU9yalVzbW5oVyIsIm93bmVyTmFtZSI6IkJob3dtaWsiLCJvd25lckVtYWlsIjoiYmhvd21pa19jaGF3ZGFAc3JtYXAuZWR1LmluIiwicm9sbE5vIjoiQVAyMjExMDAxMDk2MiJ9.kbluBU3g5ufTJSzMqvaeLFkx9FPYIrRmh33Sz7aJer8"

const axiosConfig = {
    headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
    }
};

export const getTopUser = async (req, res) => {
    try {
        const response = await axios.get(`${TEST_URL}/users`, axiosConfig);
        const usersObj = response.data.users; 
        const users = Object.keys(usersObj).map(id => ({ id, name: usersObj[id] }));
        
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        const postCounts = {};
        
        await Promise.all(users.map(async (user) => {
            const postsResponse = await axios.get(`${TEST_URL}users/${user.id}/posts`, axiosConfig);
            const posts = postsResponse.data.posts || [];
            postCounts[user.id] = posts.length;
        }));
        console.log(postCounts);

        const topUsers = users.sort((a, b) => postCounts[b.id] - postCounts[a.id]).slice(0, 5);

        res.json(topUsers);
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ error: error.message });
    }
}




