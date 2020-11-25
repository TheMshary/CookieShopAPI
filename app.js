const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieRoutes = require("./routes/cookies");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/cookies", cookieRoutes);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
