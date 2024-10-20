import express from "express";

import {
	addProductToCart,
	deleteProductFromCart,
	getTotalPrice,
	getUserCart,
	getUserCartCount,
	updateProductCountInCart,
} from "../controllers/cart.controller.js";
import Cart from "../models/cart.model.js";
const router = express.Router();

router.post("/add", addProductToCart);

router.get("/allProducts", getUserCart);

router.get("/count-cart-elements", getUserCartCount);

router.delete("/delete", deleteProductFromCart);

router.patch("/update", updateProductCountInCart);

router.get("/total-price", getTotalPrice);

export default router;
