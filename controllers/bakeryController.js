const { Bakery, Cookie } = require("../db/models");

exports.bakeryList = async (req, res, next) => {
  try {
    const bakeries = await Bakery.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Cookie,
          as: "cookies",
          attributes: ["id"],
        },
      ],
    });
    res.json(bakeries);
  } catch (error) {
    next(error);
  }
};

exports.bakeryCreate = async (req, res, next) => {
  try {
    const foundBakery = await Bakery.findOne({
      where: {
        userId: req.user.id,
      },
    });
    if (foundBakery) {
      const err = new Error("You already have a bakery.. don't be greedy....");
      err.status = 400;
      return next(err);
    }
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.userId = req.user.id;
    const newBakery = await Bakery.create(req.body);
    res.status(201).json(newBakery);
  } catch (error) {
    next(error);
  }
};

exports.cookieCreate = async (req, res, next) => {
  try {
    const bakery = await Bakery.findOne({
      where: {
        userId: req.user.id,
      },
    });
    if (bakery) {
      if (bakery.id === req.params.bakeryId) {
        if (req.file) {
          req.body.image = `http://${req.get("host")}/media/${
            req.file.filename
          }`;
        }
        req.body.bakeryId = req.params.bakeryId;
        const newCookie = await Cookie.create(req.body);
        res.status(201).json(newCookie);
      }
    } else {
      const err = new Error("Bakery Not Found");
      err.status = 404;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};
