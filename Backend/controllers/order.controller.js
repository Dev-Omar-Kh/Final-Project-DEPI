import Order from "../models/order.js";
import Cart from "../models/cart.model.js";
import { errorHandler } from "../middleware/errorHandler.js";

export const createOrder = async (req, res, next) => {

    try {

        const currentUser = req.user.id;

        const cartItemsData = await Cart.findOne({ userId: currentUser }).populate("products.bookId");

        if (!cartItemsData || !cartItemsData.products || cartItemsData.products.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        const cartItems = cartItemsData.products.map((item) => ({
            bookId: item.bookId._id,
            quantity: item.quantity,
        }));

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

        let totalAmount = 0;

        if (totalPriceResult.length > 0 && totalPriceResult[0].totalPrice !== undefined) {
            totalAmount = parseFloat((totalPriceResult[0].totalPrice + 100).toFixed(2));
        }

        const { fullName, phone, email, address, message } = req.body;

        const newOrder = new Order({

            userId: currentUser,
            cartItems,
            totalAmount,
            fullName,
            phone,
            email,
            address,
            message,

        });

        const savedOrder = await newOrder.save();

        await Cart.deleteMany({ userId: currentUser });

        res.status(201).json({
        success: true,
        message: 'Order created successfully',
        order: savedOrder,
        });

    } catch (err) {
        return next(errorHandler(500, err.message || 'Error creating order'));
    }

};

export const getOrders = async (req, res) => {
    try {

        const orders = await Order.find().populate('userId').populate('cartItems.bookId');
        res.status(200).json({data: orders});

    } catch (error) {
        res.status(500).json({ error: 'Error retrieving orders' });
    }
};

export const getOrderById = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id).populate('userId').populate('cartItems.bookId');
        if (!order) return res.status(404).json({ error: 'Order not found' });

        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({ error: 'Error retrieving order' });
    }
};

export const getOrdersByUserId = async (req, res) => {

    try {

        const userId = req.user.id;

        const orders = await Order.find({ userId }).populate('userId').populate('cartItems.bookId');

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }

        res.status(200).json({ data: orders });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

export const updateOrderStatus = async (req, res) => {

    try {

        const { id } = req.params;
        const { status , message } = req.body;

        if (!status || !message) {
            return res.status(400).json({ error: 'Status and message are required' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status , message },
            { new: true }
        );

        if (!updatedOrder) return res.status(404).json({ error: 'Order not found' });

        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            order: updatedOrder,
        });

    } catch (error) {
        res.status(500).json({ error: 'Error updating order status' });
    }

};

export const deleteOrder = async (req, res) => {

    try {

        const { id } = req.params;

        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) return res.status(404).json({ error: 'Order not found' });

        res.status(200).json({ success: true, message: 'Order deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Error deleting order' });
    }

};