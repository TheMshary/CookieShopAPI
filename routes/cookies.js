const express = require("express");
const router = express.Router();
const {
  cookieList,
  cookieDelete,
  cookieCreate,
  cookieUpdate,
} = require("../controllers/cookieController");

// Cookie List
router.get("/", cookieList);

// Cookie Delete
router.delete("/:cookieId", cookieDelete);

// Cookie Create
router.post("/", cookieCreate);

// Cookie Update
router.put("/:cookieId", cookieUpdate);

module.exports = router;