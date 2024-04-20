import express from "express";
import mysql from "mysql";
import cors from "cors"
import authRoute from "./routes/auth.route.js";

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
  };

const app = express();

//middleware
app.use(cors(corsOptions));
app.use(express.json());

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "oarda82",
  database: "inker",
});


app.use("/api/auth", authRoute);



app.listen(8000, () => {
  console.log("Connected to Server!");
});
