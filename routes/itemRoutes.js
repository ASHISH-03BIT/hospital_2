const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createLostItem,
  getLostItems,
  getLostItemById,
  createFoundItem,
  getFoundItems,
  claimItem,
} = require("../controllers/itemController");

const router = express.Router();

router.post("/lost-items", protect, createLostItem);
router.get("/lost-items", protect, getLostItems);
router.get("/lost-items/:id", protect, getLostItemById);

router.post("/found-items", protect, createFoundItem);
router.get("/found-items", protect, getFoundItems);

router.put("/items/:id/claim", protect, claimItem);

module.exports = router;
