// index.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import blogRouter from "./src/routers/Blog.js";
import cors from "cors";

const app = express();
dotenv.config();




// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
app.use("/api", blogRouter);



// console.log("Session secret: ", process.env.GOOGLE_SESSION_SECRET);

const port = process.env.PORT || 3000;
const dbURL = process.env.MONGODB_CONNECTION_URL;
console.log(dbURL);

// connect db
const connect = (url) => {
  mongoose
    .connect(url)
    .then(() => console.log("DB Connected suceesfully!"))
    .catch((err) => {
      console.log("Error connecting to DB", err.message);
    });
};
connect(dbURL);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});