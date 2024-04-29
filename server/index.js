import express from "express";
import mysql from "mysql";
import cors from "cors"
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import reviewRoute from "./routes/review.route.js";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import productsRoute from "./routes/products.route.js";
dotenv.config();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
  };

const app = express();

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "oarda82",
  database: "inker",
});

//middleware
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());


app.listen(8000, () => {
  console.log("Connected to Server!");
});




app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/products", productsRoute);
app.use("/api/reviews", reviewRoute);



