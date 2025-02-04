import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./database/connection.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://lead-activity.settlemyloan.in",
      // "https://api.singledebt.in",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

//
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
//

dotenv.config(".dotenv");
connect();

// test
app.get("/", (req, res) => {
  res.send("SML lead activity");
});

// routes
import leadActivity from "./routes/leadActivity.js";
app.use("/", leadActivity);

import linkOperation from "./routes/linkOperation.js";
app.use("/", linkOperation);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
