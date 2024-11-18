import express from "express";
const router = express.Router();

import {createOrder , getOrders , getOrderById, updateOrderStatus, deleteOrder, getOrdersByUserId} from '../controllers/order.controller.js'

import isAdmin from "../middleware/isAdmin.js";

router.post('/add' , createOrder);

router.get('/allOrders'  , isAdmin, getOrders);

router.get('/order/:id' , isAdmin, getOrderById);

router.put('/update/:id', isAdmin, updateOrderStatus);

router.delete('/delete/:id', isAdmin, deleteOrder);

router.get('/userOrders', getOrdersByUserId);



export default router;