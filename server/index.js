import express from "express";
import mysql from "mysql";
import cors from "cors"

const corsOptions = {
    origin: 'http://localhost:5173',//(https://your-client-app.com)
    optionsSuccessStatus: 200,
  };
const app = express();
app.use(cors(corsOptions));
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "oarda82",
  database: "inker",
});

app.use(express.json())

app.get("/", (req, res) => {
  res.json("Hello from the Backend!");
});

app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data)
  });
});

app.post("/user/signup", (req, res) => {
    console.log(req.body);
  const q = "INSERT INTO users (`email`,`password`,`name`,`surname`,`admin`) VALUES (?)";
  const values = [req.body.email,req.body.password,req.body.name,req.body.surname,0]
  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json(values);
    }
    return res.json(values)
  });
});

app.listen(8000, () => {
  console.log("Connected to Server!");
});
