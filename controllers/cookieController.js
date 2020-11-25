let cookies = require("../cookies");
const slugify = require("slugify");

exports.cookieList = (req, res) => {
  res.json(cookies);
};

exports.cookieDelete = (req, res) => {
  const { cookieId } = req.params;
  const foundCookie = cookies.find((cookie) => cookie.id === +cookieId);
  if (foundCookie) {
    cookies = cookies.filter((cookie) => cookie.id !== +cookieId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Cookie not found." });
  }
};

exports.cookieCreate = (req, res) => {
  const id = cookies[cookies.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newCookie = { id, slug, ...req.body };
  cookies.push(newCookie);
  res.status(201).json(newCookie);
};

exports.cookieUpdate = (req, res) => {
  const { cookieId } = req.params;
  const foundCookie = cookies.find((cookie) => cookie.id === +cookieId);
  if (foundCookie) {
    for (const key in req.body) foundCookie[key] = req.body[key];
    foundCookie.slug = slugify(req.body.name, { lower: true });
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Cookie not found." });
  }
};
