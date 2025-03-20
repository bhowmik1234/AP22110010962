import express from "express";
import { getTopPost } from "../controllers/topPost.controller.js";

const app = express.Router();

app.get('/posts', getTopPost);

export default app;