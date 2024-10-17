import User from "../models/user.js";
import { errorHandler } from "./errorHandler.js";
import jwt from "jsonwebtoken";

const isAdmin = async (req, res, next) => {
	const { email } = req.user;

	try {
		const theUser = await User.findOne({ email });
		if (theUser.role === "ADMIN") {
			return next();
		}
		return next(errorHandler(403, "admin permission required"));
	} catch (error) {
		return next(errorHandler(403, "admin permission required"));
	}
};
export default isAdmin;
