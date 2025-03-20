import express from "express";
import { getTopUser } from "../controllers/topUser.controller.js";

const router = express.Router();

router.get('/users', getTopUser);

export default router;