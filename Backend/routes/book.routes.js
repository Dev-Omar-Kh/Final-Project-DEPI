import express from "express";
const router = express.Router();
import {
	addBook,
	deleteBook,
	getAllBooks,
	getBook,
	updateBook,
} from "../controllers/book.controllers.js";
import isAuth from "../middleware/isAuth.js";
import isAdmin from "../middleware/isAdmin.js";

router.post("/add", isAuth, isAdmin, addBook);
router.get("/single/:id", getBook);
router.get("/all", getAllBooks);
router.patch("/update/:id", isAuth, isAdmin,  updateBook);
router.delete("/delete/:id", isAuth, isAdmin, deleteBook);

export default router;
