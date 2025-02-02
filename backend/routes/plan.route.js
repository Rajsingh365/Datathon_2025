import express from "express";
import { generateImage,sendEmail } from '../controllers/plan.controller.js';

const router = express.Router();

router.post("/generate-img", generateImage);
router.post("/send-email", sendEmail);


export default router;  // Export the router object