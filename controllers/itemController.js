const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");

const sendResponse = (res, statusCode, success, message, data = null) => {
  const response = { success, message };
  if (data !== null) response.data = data;
  return res.status(statusCode).json(response);
};

const buildListFilter = (query) => {
  const { category, q, status, mine, claimed } = query;
  const filter = {};

  if (category) filter.category = category;
  if (status) filter.status = status;
  if (claimed === "true") filter.claimed = true;
  if (claimed === "false") filter.claimed = false;

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
      { category: { $regex: q, $options: "i" } },
    ];
  }

  return { filter, mine: mine === "true" };
};

const createLostItem = async (req, res, next) => {
  try {
    const { title, description, category, locationLost, dateLost, image } = req.body;

    if (!title || !description || !category || !locationLost || !dateLost) {
      return sendResponse(res, 400, false, "title, description, category, locationLost and dateLost are required");
    }

    const item = await LostItem.create({
      title,
      description,
      category,
      locationLost,
      dateLost,
      image,
      createdBy: req.user.id,
    });

    return sendResponse(res, 201, true, "Lost item reported", item);
  } catch (error) {
    next(error);
  }
};

const getLostItems = async (req, res, next) => {
  try {
    const { filter, mine } = buildListFilter(req.query);
    if (mine) filter.createdBy = req.user.id;

    const items = await LostItem.find(filter)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return sendResponse(res, 200, true, "Lost items fetched", { count: items.length, items });
  } catch (error) {
    next(error);
  }
};

const getLostItemById = async (req, res, next) => {
  try {
    const item = await LostItem.findById(req.params.id).populate("createdBy", "name email");

    if (!item) {
      return sendResponse(res, 404, false, "Lost item not found");
    }

    return sendResponse(res, 200, true, "Lost item fetched", item);
  } catch (error) {
    if (error.name === "CastError") {
      return sendResponse(res, 400, false, "Invalid item ID");
    }
    next(error);
  }
};

const createFoundItem = async (req, res, next) => {
  try {
    const { title, description, category, locationFound, dateFound, image } = req.body;

    if (!title || !description || !category || !locationFound || !dateFound) {
      return sendResponse(res, 400, false, "title, description, category, locationFound and dateFound are required");
    }

    const item = await FoundItem.create({
      title,
      description,
      category,
      locationFound,
      dateFound,
      image,
      createdBy: req.user.id,
    });

    return sendResponse(res, 201, true, "Found item reported", item);
  } catch (error) {
    next(error);
  }
};

const getFoundItems = async (req, res, next) => {
  try {
    const { filter, mine } = buildListFilter(req.query);
    if (mine) filter.createdBy = req.user.id;

    const items = await FoundItem.find(filter)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return sendResponse(res, 200, true, "Found items fetched", { count: items.length, items });
  } catch (error) {
    next(error);
  }
};

const claimItem = async (req, res, next) => {
  try {
    const foundItem = await FoundItem.findById(req.params.id);
    if (foundItem) {
      foundItem.claimed = true;
      foundItem.status = "resolved";
      await foundItem.save();
      return sendResponse(res, 200, true, "Found item marked as claimed", foundItem);
    }

    const lostItem = await LostItem.findById(req.params.id);
    if (lostItem) {
      lostItem.status = "resolved";
      await lostItem.save();
      return sendResponse(res, 200, true, "Lost item marked as resolved", lostItem);
    }

    return sendResponse(res, 404, false, "Item not found");
  } catch (error) {
    if (error.name === "CastError") {
      return sendResponse(res, 400, false, "Invalid item ID");
    }
    next(error);
  }
};

module.exports = {
  createLostItem,
  getLostItems,
  getLostItemById,
  createFoundItem,
  getFoundItems,
  claimItem,
};
