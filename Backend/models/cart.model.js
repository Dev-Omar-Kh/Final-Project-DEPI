import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
	{
		bookId: {
			ref: "book",
			type: String,
		},
		quantity: Number,
		userId: String,
	},
	{
		timestamps: true,
	}
);

const Cart = mongoose.model("cart", cartSchema);

export default Cart;