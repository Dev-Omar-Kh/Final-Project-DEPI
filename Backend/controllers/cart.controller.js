import Cart from "../models/cart.model.js";
import { errorHandler } from "../middleware/errorHandler.js";

export const addProductToCart = async (req, res, next) => {

	try {

		const { bookId } = req.body;
		const currentUser = req.user.id;

		let userCart = await Cart.findOne({ userId: currentUser });

		if (userCart) {

			const existingProduct = userCart.products.find(
				(product) => product.bookId === bookId
			);

			if (existingProduct) {

				return res.status(400).json({
					message: "Product already in cart",
					success: false,
				});

			} 
			else {
				userCart.products.push({ bookId, quantity: 1 });
			}

			await userCart.save();

		} 
		else {

			const newCart = new Cart({
				userId: currentUser,
				products: [{ bookId, quantity: 1 }],
			});

			await newCart.save();

		}

		return res.json({
			message: "Product added to cart",
			success: true,
		});

	} catch (err) {

		return next(
			errorHandler(400, err?.message || "Failed to add product to cart")
		);

	}

};

export const getUserCart = async (req, res, next) => {

    try {

        const currentUser = req.user.id;

        const userCart = await Cart.findOne({ userId: currentUser }).populate("products.bookId");

        if (!userCart) {

            return res.json({
                data: [],
                success: true,
                message: "No products found in the cart",
                totalPrice: 0,
            });

        }

        const totalPriceResult = await Cart.aggregate([

            { $match: { userId: currentUser } },
            { $unwind: "$products" },
            {
                $lookup: {
                    from: "books",
                    let: { bookId: { $toObjectId: "$products.bookId" } },
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
                            $cond: [
                                { $gt: ["$bookDetails.offer", 0] },
                                {
                                    $multiply: [
                                        {
                                            $subtract: [
                                                "$bookDetails.price",
                                                {
                                                    $multiply: [
                                                        "$bookDetails.price",
                                                        { $divide: ["$bookDetails.offer", 100] }
                                                    ],
                                                },
                                            ],
                                        },
                                        "$products.quantity"
                                    ],
                                },
                                { $multiply: ["$bookDetails.price", "$products.quantity"] }
                            ],
                        },
                    },
                },
            },

        ]);

        let totalPrice = 0;
        if (totalPriceResult.length > 0) {
            totalPrice = parseFloat(totalPriceResult[0].totalPrice.toFixed(2));
        }

        res.json({
            data: userCart.products,
            success: true,
            message: "All products fetched",
            totalPrice,
        });

    } catch (err) {
        return next(
            errorHandler(404, err?.message || "Couldn't fetch the cart elements")
        );
    }
};

export const updateProductCountInCart = async (req, res, next) => {

	try {

		const { bookId, quantity } = req.body;
		const currentUser = req.user.id;

		let userCart = await Cart.findOne({ userId: currentUser });

		if (!userCart) {
			return next(errorHandler(404, "Cart not found for this user"));
		}

		const product = userCart.products.find((p) => p.bookId === bookId);
		
		if (product) {
			product.quantity = quantity;
			await userCart.save();
		} 
		else {
			return next(errorHandler(404, "Product not found in cart"));
		}

		res.json({
			message: "Product quantity updated",
			success: true,
		});

	} catch (err) {
		return next(errorHandler(400, err?.message || "Failed to update quantity"));
	}

};

export const deleteProductFromCart = async (req, res, next) => {

    try {

        const { bookId } = req.body;
        const currentUser = req.user.id;

        const userCart = await Cart.findOne({ userId: currentUser });
        if (!userCart) {
            return next(errorHandler(404, "Cart not found"));
        }

        
        const product = userCart.products.find((product) => product.bookId === bookId);
        if (!product) {
            return next(errorHandler(404, "Book ID not found in cart"));
        }

        userCart.products = userCart.products.filter((product) => product.bookId !== bookId);
        
        await userCart.save();

        res.json({
            message: "Product deleted from cart",
            success: true,
        });

    } catch (err) {

        return next(
            errorHandler(
                500,
                err?.message || "Couldn't delete the cart element"
            )
        );

    }

};

export const deleteCart = async (req, res, next) => {

    try {

        const currentUser = req.user.id;

        const userCart = await Cart.findOneAndDelete({ userId: currentUser });
        if (!userCart) {
            return next(errorHandler(404, "Cart not found"));
        }

        res.json({
            message: "Cart deleted successfully",
            success: true,
        });

    } catch (err) {

        return next(
            errorHandler(
                500,
                err?.message || "Couldn't delete the cart"
            )
        );

    }

};
