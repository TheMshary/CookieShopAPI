const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const slugify = require("slugify");
let cookies = require("./cookies");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

/********* Routes *********/
// Cookie List
app.get("/cookies", (req, res) => {
  res.json(cookies);
});

// Cookie Delete
app.delete("/cookies/:cookieId", (req, res) => {
  const { cookieId } = req.params;
  const foundCookie = cookies.find((cookie) => cookie.id === +cookieId);
  if (foundCookie) {
    cookies = cookies.filter((cookie) => cookie.id !== +cookieId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Cookie not found." });
  }
});

// Cookie Create
app.post("/cookies", (req, res) => {
  const id = cookies[cookies.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newCookie = { id, slug, ...req.body };
  cookies.push(newCookie);
  res.status(201).json(newCookie);
});

// Cookie Update
app.put("/cookies/:cookieId", (req, res) => {
  const { cookieId } = req.params;
  const foundCookie = cookies.find((cookie) => cookie.id === +cookieId);
  if (foundCookie) {
    for (const key in req.body) foundCookie[key] = req.body[key];
    foundCookie.slug = slugify(req.body.name, { lower: true });
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Cookie not found." });
  }
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
