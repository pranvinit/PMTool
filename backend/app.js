require("dotenv").config();
const express = require("express");
const app = express();

// database
const connectDB = require("./db/connect");

// middleware imports
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(morgan("tiny"));

app.set("trust proxy", 1);
app.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 100 }));
app.use(cookieParser(process.env.SIGNED_COOKIE_SECRET));

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
