const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  cookieList,
  cookieDelete,
  cookieUpdate,
  fetchCookie,
} = require("../controllers/cookieController");
const upload = require("../middleware/multer");

router.param("cookieId", async (req, res, next, cookieIdVariable) => {
  const cookie = await fetchCookie(cookieIdVariable, next);
  if (cookie) {
    req.cookie = cookie;
    next();
  } else {
    const err = {
      status: 404,
      message: "Cookie not found by Salwa",
    };
    next(err);
  }
});

// Cookie List
router.get("/", cookieList);

// Cookie Delete
router.delete(
  "/:cookieId",
  passport.authenticate("jwt", { session: false }),
  cookieDelete
);

// Cookie Update
router.put(
  "/:cookieId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  cookieUpdate
);

module.exports = router;
