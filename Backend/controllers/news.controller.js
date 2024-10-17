import News from "../models/newsletter.model.js";
import { errorHandler } from "../middleware/errorHandler.js";

export const getNews = async (req, res, next) => {
	try {
		const news = await News.find({});
		return res.status(200).json({
			success: true,
			message: "news fetched",
			data: news,
		});
	} catch (error) {
		return next(errorHandler(400, "try again later"));
	}
};
export const addNews = async (req, res, next) => {
	const { title, date, description } = req.body;
	if (!title || !date || !description) {
		return next(errorHandler(400, "please provide all required fields"));
	}
	try {
		const newsLetter = new News({
			title,
			date,
			description,
		});
		await newsLetter.save();

		return res.status(201).json({
			success: true,
			message: "newsletter added",
			data: newsLetter,
		});
	} catch (error) {
		return next(errorHandler(400, "adding news failed"));
	}
};
export const updateNews = async (req, res, next) => {
	const target = req.params.id;
	try {
		const updated = await News.findByIdAndUpdate(target, req.body, {
			new: true,
		});
		return res.status(200).json({
			success: true,
			message: "newsletter updated",
			data: updated,
		});
	} catch (error) {
		return next(errorHandler(400, "updating news failed"));
	}
};
export const deleteNews = async (req, res, next) => {
	const target = req.params.id;
	try {
		await News.findByIdAndDelete(target);
		return res.status(200).json({
			success: true,
			message: "newsletter deleted",
		});
	} catch (error) {
		return next(errorHandler(400, "removing news failed"));
	}
};
