import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/Auth.js";
import userRoutes from "./routes/User.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();
dotenv.config();

// middlewares
app.use(express.json());

// db connection
connectDb().catch((err) => console.log(err));
async function connectDb() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Database Connected");
}

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(5000, console.log(`Server is listening on port ${port}`));
