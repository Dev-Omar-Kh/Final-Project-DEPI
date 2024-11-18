import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	bookId: {
		type: String,
		ref: "book",
	},
	quantity: {
		type: Number,
		default: 1,
	},
});

const cartSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
			unique: true,
		},
		products: [productSchema],
	},
	{
		timestamps: true,
	}
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;