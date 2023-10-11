import express from "express";
import process from "node:process";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();


//Objects

import UserRouter from "./routes/User.router.js";
import AuthRouter from "./routes/Auth.router.js";
import BuilderRouter from "./routes/Builder.router.js";
import MerchantRouter from "./routes/merchantPage.router.js"
import ProductRouter from "./routes/Product.router.js";
import ProfileRouter from "./routes/Profile.router.js";

//Server
const app = express();
const PORT = process.env.PORT || 3000;

app.set("port", PORT);

//Database
mongoose
  .connect(
    "mongodb+srv://brandeduplift:Password!1@cluster0.8qpsegc.mongodb.net/Branded"
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error(err);
  });

//Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.use((req, res, next) => {
  console.log(`${req.method} for ${req.url}`);

  next();
});

//Routes
app.use("/user", UserRouter);
app.use("/auth", AuthRouter);
app.use("/product", ProductRouter);
app.use("/builder", BuilderRouter);
app.use("/profile", ProfileRouter);
app.use("/merchant", MerchantRouter);

// TOKEN CHECK
app.use((req, res, next) => {
  const token = req.headers.authorization;
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.sendStatus(401);
  }
  
});


app.use((req, res, next) => {
  const token = req.headers.authorization;
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.sendStatus(401);
  }
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
