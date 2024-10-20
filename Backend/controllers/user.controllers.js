import User from "../models/user.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { errorHandler } from "../middleware/errorHandler.js";

export const getUser = async (req, res, next) => {
	const { id } = req.params;
	try {
		const user = await User.findById({ _id: id });
		if (!user) {
			throw Error("could not find the user");
		}
		//exclude the password from the response
		const { password, ...rest } = user._doc;
		//server respond after creating the user successfully
		return res
			.status(200)
			.json({ success: true, data: rest, message: "user fetched" });
	} catch (error) {
		return next(errorHandler(404, error.message));
	}
};
export const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find({});
		if (!users) {
			throw Error("could not find the users");
		}
		//server respond after creating the user successfully
		return res
			.status(200)
			.json({ success: true, data: users, message: "users fetched" });
	} catch (error) {
		return next(errorHandler(404, error.message));
	}
};

export const postUser = async (req, res, next) => {
	const { username, email, phone, password, confirmPassword } = req.body;
	//checking all the required field
	if (!username || !email || !password || !phone || !confirmPassword) {
		return next(errorHandler(400, "all fields are required"));
	}
	//checking if user exist
	const isExistMail = await User.findOne({ email });
	if (isExistMail) {
		return next(errorHandler(400, "user already exist"));
	}
	const isValidEmail = validator.isEmail(email);
	if (!isValidEmail) {
		return next(errorHandler(400, "not a valid email"));
	}
	//check if password is valid
	const isValidPassword = validator.isLength(password, { min: 6 });
	if (!isValidPassword) {
		return next(
			errorHandler(400, "password should be 6 characters at least")
		);
	}
	if (password != confirmPassword) {
		return next(errorHandler(400, "something went wrong"));
	}
	//encrypt the user password
	const hashedPassword = bcrypt.hashSync(password, 10);

	try {
		const newUser = await new User({
			username,
			email,
			phone,
			password: hashedPassword,
		}).save();

		//exclude the password from the response
		const { password, ...rest } = newUser._doc;
		//server respond after creating the user successfully
		return res
			.status(201)
			.json({ success: true, data: rest, message: "user created" });
	} catch (error) {
		return next(errorHandler(400, error.message));
	}
};
export const updateUser = async (req, res, next) => {
	const { id } = req.params;
	const { username, email, phone, role } = req.body;
	try {
		const user = await User.findByIdAndUpdate(
			{ _id: id },
			{
				$set: {
					username,
					email,
					phone,
					role,
				},
			},
			{ new: true }
		);
		//exclude the password from the response
		const { password, ...rest } = user._doc;
		//server respond after creating the user successfully
		return res
			.status(200)
			.json({ success: true, data: rest, message: "user updated" });
	} catch (error) {
		return next(errorHandler(400, error.message));
	}
};
export const changePassword = async (req, res, next) => {
	const { id } = req.params;
	const { password } = req.body;
	const hashedPassword = bcrypt.hashSync(password, 10);
	try {
		const user = await User.findByIdAndUpdate(
			{ _id: id },
			{
				$set: {
					password: hashedPassword,
				},
			},
			{ new: true }
		);
		//server respond after creating the user successfully
		return res
			.status(200)
			.json({ success: true, message: "password changed" });
	} catch (error) {
		return next(errorHandler(400, error.message));
	}
};
export const deleteUser = async (req, res, next) => {
	const { id } = req.params;
	try {
		const user = await User.findByIdAndDelete({ _id: id });
		//exclude the password from the response
		const { password, ...rest } = user._doc;
		//server respond after creating the user successfully
		return res
			.status(200)
			.json({ success: true, data: rest, message: "user delted" });
	} catch (error) {
		return next(errorHandler(400, error.message));
	}
};
