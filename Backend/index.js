import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
import newsRoutes from "./routes/news.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import isAuth from "./middleware/isAuth.js";
// Load environment variables from .env file
dotenv.config();

// CORS options to check origin dynamically
const corsOptions = {
	origin: [
		"https://book-store-five-swart.vercel.app",
		"http://localhost:3000",
		"https://book-store-backend-mauve.vercel.app",
	],
	credentials: true, // Allow cookies to be sent with requests
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/book", bookRoutes);
app.use("/authentication", authRoutes);
app.use("/news", isAuth, newsRoutes);
//Error handler route
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";
	return res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	});
});

mongoose
	.connect(process.env.DB_URL, {
		dbName: process.env.NAME,
	})
	.then(() => {
		app.listen(process.env.PORT || 3000, () => {
			console.log(`server is running at port: ${process.env.PORT}`);
		});
	});
