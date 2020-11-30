const { Cookie } = require("../db/models");

// I AM NOOOOT A MIDDLEWARE, I'M A REGULAR, KATKOOT FUNCTION
exports.fetchCookie = async (cookieId, next) => {
  try {
    const foundCookie = await Cookie.findByPk(cookieId);
    return foundCookie;
  } catch (error) {
    next(error);
  }
};

exports.cookieList = async (req, res, next) => {
  try {
    const cookies = await Cookie.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(cookies);
  } catch (error) {
    next(error);
  }
};

exports.cookieDelete = async (req, res, next) => {
  try {
    await req.cookie.destroy(); // 💥
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.cookieCreate = async (req, res, next) => {
  console.log(
    "🚀 ~ file: cookieController.js ~ line 1 ~ exports.cookieCreate= ~ req.body",
    req.file.filename
  );

  console.log(req.get("host"));
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newCookie = await Cookie.create(req.body);
    res.status(201).json(newCookie);
  } catch (error) {
    next(error);
  }
};

exports.cookieUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.cookie.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
