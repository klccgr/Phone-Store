const express = require("express");
const {
  getPhones,
  createPhone,
  getPhoneById,
  UpdatePhone,
  DeletePhone,
} = require("../controllers/phonesController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getPhones);
router.route("/create").post(protect, createPhone);
router
  .route("/:id")
  .get(getPhoneById)
  .put(protect, UpdatePhone)
  .delete(protect, DeletePhone);

module.exports = router;
