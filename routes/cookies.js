const express = require("express");
const router = express.Router();
const {
  cookieList,
  cookieDelete,
  cookieCreate,
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
router.delete("/:cookieId", cookieDelete);

// Cookie Update
router.put("/:cookieId", upload.single("image"), cookieUpdate);

module.exports = router;
