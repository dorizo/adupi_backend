import express from "express";
// import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./app/routes/index.js";
import expressValidator from 'express-validator';

// dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(router);
// app.use(expressValidator);

app.listen(5000, () => console.log("Server running at port 5000"));
