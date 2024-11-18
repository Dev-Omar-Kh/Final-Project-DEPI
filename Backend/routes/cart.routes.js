import express from "express";

import {
	addProductToCart,
	deleteProductFromCart,
	getUserCart,
	updateProductCountInCart,
	deleteCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add", addProductToCart);

router.get("/allProducts", getUserCart);

router.patch("/update", updateProductCountInCart);

router.delete("/delete", deleteProductFromCart);

router.delete("/deleteAll", deleteCart);

export default router;
