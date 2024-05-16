import express from "express";
import chalk from "chalk";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
//
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";

//DOT ENV
dotenv.config();
const app = express();
//CORS
const corsOptions = {
  orgin: true,
};
//DATABASE CONNECTION
import dbConnection from "./database/dbConnection.js";
dbConnection();
//REQUIRED
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/auth", authRoute); //domain/api/v1/auth/register
app.use("/api/v1/users", userRoute); //domain/api/v1/auth/register
app.use("/api/v1/doctors", doctorRoute); //domain/api/v1/auth/register
app.use("/api/v1/reviews", reviewRoute); //domain/api/v1/auth/register

//PORT
const port = process.env.PORT || 3000;

//ROUTER
app.get("/", (req, res) => {
  res.send("api is working");
});

//ERROR HANDLER
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 400;
  next(error);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

const aquaBlue = chalk.hex("#00FFFF");

app.listen(port, () =>
  console.log(
    aquaBlue(`THE SERVER IS RUNNING ON: ${chalk.hex("#FFC0CB").bold(port)} !`)
  )
);
