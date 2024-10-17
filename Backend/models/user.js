import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true,
		},
		phone: {
			type: Number,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minLength: 6,
		},
		role: {
			type: String,
			default: "GENERAL",
		},
	},
	{ timestamps: true }
);
const User = mongoose.model("user", userSchema);
export default User;
