import express from "express";
import { getTopPost } from "../controllers/topPost";

const app = express.Router();

app.get('/posts?type=popular', getTopPost);

export default app;