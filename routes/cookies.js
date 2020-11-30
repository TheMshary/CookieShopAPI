const express = require("express");
const router = express.Router();
const {
  cookieList,
  cookieDelete,
  cookieCreate,
  cookieUpdate,
  fetchCookie,
} = require("../controllers/cookieController");

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

router.use((req, res, next) => {
  console.log("HIIIIIIII, IM INSIIIDDDDEEEE COOOOKKKIIIEEEESS");
  next();
});

// Cookie Create
router.post("/", cookieCreate);

// Cookie Update
router.put("/:cookieId", cookieUpdate);

module.exports = router;
