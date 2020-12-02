const express = require("express");
const db = require("./db/models");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieRoutes = require("./routes/cookies");
const bakeryRoutes = require("./routes/bakeries");
const path = require("path");

const app = express();

console.log("directory name");

// Middleware
app.use(cors());
app.use(bodyParser.json());

const mediaPath = path.join(__dirname, "media");

// Routes
app.use("/bakeries", bakeryRoutes);
app.use("/cookies", cookieRoutes);
app.use("/media", express.static(mediaPath));

// NOT FOUND PATH MIDDLEWARE
app.use((req, res, next) => {
  console.log("PATH DOESN'T EXIST");
  res.status(404).json({ message: "PATH NOT FOUND!" });
});

app.use((err, req, res, next) => {
  console.log("🚀 ~ file: app.js ~ line 31 ~ app.use ~ err", err);
  res.status(err.status ?? 500);
  res.json({ message: err.message || "Internal Server Error" });
});

const run = async () => {
  try {
    // await db.sequelize.sync();
    await db.sequelize.sync({ alter: true });
    // await db.sequelize.sync({ force: true });
    console.log("Connection to the database successful!");
    app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("error", error);
  }
};

run();
