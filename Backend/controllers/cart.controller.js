import express from "express";
import Cart from "../models/cart.model.js";
import { errorHandler } from "../middleware/errorHandler.js";

export const addProductToCart = async (req, res, next) => {
	try {
		const { bookId } = req.body;
		const currentUser = req.user.id;

		const isProductAvailable = await Cart.findOne({ bookId });

		if (isProductAvailable) {
			return next(errorHandler(400, "book already in the cart"));
		}

		const payload = {
			bookId: bookId,
			quantity: 1,
			userId: currentUser,
		};

		const newAddToCart = new Cart(payload);
		const saveProduct = await newAddToCart.save();

		return res.json({
			data: saveProduct,
			message: "Book Added to Cart",
			success: true,
		});
	} catch (err) {
		return next(
			errorHandler(400, err?.message || "bad request to add to the cart")
		);
	}
};

export const getUserCart = async (req, res, next) => {
	try {
		const currentUser = req.user.id;

		const allProduct = await Cart.find({
			userId: currentUser,
		}).populate("bookId");

		res.json({
			data: allProduct,
			success: true,
			message: "all books fetched",
		});
	} catch (err) {
		return next(
			errorHandler(
				404,
				err?.message || " couldn't fetch the cart elements"
			)
		);
	}
};

export const getUserCartCount = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const count = await Cart.countDocuments({
			userId: userId,
		});

		res.json({
			data: {
				count: count,
			},
			message: "count of cart products fetched",
			success: true,
		});
	} catch (error) {
		return next(
			errorHandler(
				404,
				err?.message || " couldn't fetch the cart elements count"
			)
		);
	}
};

export const deleteProductFromCart = async (req, res, next) => {
	try {
		const { cartProductId } = req.body;

		const deleteProduct = await Cart.deleteOne({
			_id: cartProductId,
		});

		res.json({
			message: "Book deleted from cart",
			success: true,
			data: deleteProduct,
		});
	} catch (err) {
		return next(
			errorHandler(
				404,
				err?.message || " couldn't delete the cart element"
			)
		);
	}
};

export const updateProductCountInCart = async (req, res, next) => {
	try {
		const { cartProductId } = req.body;

		const { quantity } = req.body;

		const updateProduct = await Cart.updateOne(
			{ _id: cartProductId },
			{
				...(quantity && { quantity: quantity }),
			}
		);

		res.json({
			message: "Book quantity Updated",
			success: true,
		});
	} catch (err) {
		return next(
			errorHandler(
				404,
				err?.message || " couldn't update the cart element"
			)
		);
	}
};

export const getTotalPrice = async (req, res, next) => {
	const userId = req.user.id;
	console.log(userId);
	try {
		const result = await Cart.aggregate([
			{ $match: { userId: userId } },
			{
				$lookup: {
					from: "books",
					let: { bookId: { $toObjectId: "$bookId" } },
					pipeline: [
						{ $match: { $expr: { $eq: ["$_id", "$$bookId"] } } },
					],
					as: "bookDetails",
				},
			},
			{ $unwind: "$bookDetails" },
			{
				$group: {
					_id: null,
					totalPrice: {
						$sum: {
							$multiply: ["$quantity", "$bookDetails.price"],
						},
					},
					totalOfferedPrice: {
						$sum: {
							$multiply: ["$quantity", "$bookDetails.offer"],
						},
					},
				},
			},
		]);
		if (result.length > 0) {
			res.status(200).json({
				success: true,
				message: "total price fetched",
				totalPrice: result[0].totalPrice,
				totalOfferedPrice: result[0].totalOfferedPrice,
			});
		} else {
			return next(
				errorHandler(
					404,
					err?.message ||
						"An error occurred while calculating the total price."
				)
			);
		}
	} catch (error) {
		return next(
			errorHandler(500, err?.message || "Cart is empty or not found.")
		);
	}
};
