import express from "express";
import {
	changePassword,
	deleteUser,
	getAllUsers,
	getUser,
	postUser,
	updateUser,
} from "../controllers/user.controllers.js";
import isAuth from "../middleware/isAuth.js";
import isAdmin from "../middleware/isAdmin.js";
const router = express.Router();

router.get("/single/:id", isAuth, isAdmin, getUser);
router.get("/all-users", isAuth, isAdmin, getAllUsers);
router.post("/add-user", postUser);
router.patch("/update/:id", isAuth, isAdmin, updateUser);
router.patch("/change-password/:id", isAuth, isAdmin, changePassword);
router.delete("/delete/:id", isAuth, isAdmin, deleteUser);

export default router;
