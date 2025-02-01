import express from "express";
import { signUp, loginUser, logoutUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;