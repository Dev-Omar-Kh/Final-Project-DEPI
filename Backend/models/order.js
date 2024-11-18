import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },

    cartItems: [
        {
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'book', required: true },
            quantity: { type: Number, required: true },
        },
    ],

    totalAmount: {
        type: Number,
        required: true,
    },

    fullName: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    message: {
        type: String,
        required: false,
    },

    status: {
        type: String,
        default: 'Pending',
    },

    rejectedMsg: {
        type: String,
    },

} , { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
