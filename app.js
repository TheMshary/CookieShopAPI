const express = require("express");
const db = require("./db/models");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieRoutes = require("./routes/cookies");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/cookies", cookieRoutes);

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
    app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("error", error)
  }
}

run();

