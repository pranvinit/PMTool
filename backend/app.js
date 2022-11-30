require("dotenv").config();
const colors = require("colors");
const express = require("express");
const app = express();

// GraphQL
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

// database
const connectDB = require("./db/connect");

// middleware imports
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

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

// Routes
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to MongoDB".blue.underline.bold);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`.yellow.underline.bold);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
