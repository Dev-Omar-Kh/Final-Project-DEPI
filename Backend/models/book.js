import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		category: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		author: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			default: false,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		offer: {
			type: Number,
		},
		image: {
			type: String,
			trim: true,
			default: "./question-mark.png",
		},
	},
	{ timestamps: true }
);
const Book = mongoose.model("book", bookSchema);
export default Book;
