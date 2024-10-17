import { errorHandler } from "../middleware/errorHandler.js";
import Book from "../models/book.js";

export const addBook = async (req, res, next) => {
	const { title, category, author, price, offer, description, image } =
		req.body;
	if (!title || !category || !author || !description || !image) {
		return next(errorHandler(404, "missing input data"));
	}
	const book = new Book({
		title,
		author,
		category,
		price,
		offer,
		description,
		image,
	});
	try {
		const newBook = await book.save();
		return res.status(201).json({
			success: true,
			message: "book added to the database",
			data: newBook,
		});
	} catch (error) {
		return next(errorHandler(400, error.message));
	}
};

export const getBook = async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return next(errorHandler(400, "no id provided"));
	}
	try {
		const book = await Book.findById(id);
		if (!book) {
			throw new Error(404, "no book with such an id");
		}
		return res.status(200).json({
			success: true,
			message: "book found",
			data: book,
		});
	} catch (error) {
		return next(errorHandler(400, error.message));
	}
};

export const getAllBooks = async (req, res, next) => {
	try {
		const books = await Book.find({});
		if (!books) {
			throw new Error(404, "no books exist in database");
		}
		return res.status(200).json({
			success: true,
			message: "books fetched",
			data: books,
		});
	} catch (error) {
		return next(errorHandler(400, error.message));
	}
};
// export const getFilteredBooks = async (req, res, next) => {
// 	const { category } = req.query;
// 	try {
// 		const books = await Book.find({category});
// 		if (!books) {
// 			throw new Error(404, "no books exist in database");
// 		}
// 		return res.status(200).json({
// 			success: true,
// 			message: "books fetched",
// 			data: books,
// 		});
// 	} catch (error) {
// 		return next(errorHandler(400, error.message));
// 	}
// };

export const updateBook = async (req, res, next) => {
	const { id } = req.params;
	try {
		const updated = await Book.findByIdAndUpdate({ _id: id }, req.body, {
			new: true,
		});
		return res.status(200).json({
			success: true,
			message: "Book updated",
			data: updated,
		});
	} catch (error) {
		return next(errorHandler(400, "updating book failed"));
	}
};

export const deleteBook = async (req, res, next) => {
	const { id } = req.params;
	try {
		await Book.findByIdAndDelete({ _id: id });
		return res.status(200).json({
			success: true,
			message: "book deleted",
		});
	} catch (error) {
		return next(errorHandler(400, "removing book failed"));
	}
};
