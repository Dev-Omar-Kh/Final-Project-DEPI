import express from "express";

import { emailSignIn, logout } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signin", emailSignIn);
router.get('/logout',logout)

export default router;
