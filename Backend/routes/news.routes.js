import express from "express";
import {
	addNews,
	deleteNews,
	getNews,
	getSingleNews,
	updateNews,
} from "../controllers/news.controller.js";
import isAdmin from "../middleware/isAdmin.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.get("/getNews", getNews);
router.get("/getSingleNews/:id", getSingleNews);
router.post("/add", isAuth, isAdmin, addNews);
router.patch("/update/:id", isAuth, isAdmin, updateNews);
router.delete("/delete/:id", isAuth, isAdmin, deleteNews);

export default router;
