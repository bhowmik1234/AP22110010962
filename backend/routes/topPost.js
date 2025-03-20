import express from "express";
import { getTopPost } from "../controllers/topPost.controller.js";

const app = express.Router();

app.get('/posts?type=popular', getTopPost);

export default app;