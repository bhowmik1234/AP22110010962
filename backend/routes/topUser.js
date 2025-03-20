import express from "express";
import { getTopUser } from "../controllers/topUser";

const app = express.Router();

app.get('/users', getTopUser);

export default app;