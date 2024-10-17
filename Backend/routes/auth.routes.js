import express from "express";

import { emailSignIn } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signin", emailSignIn);

export default router;
