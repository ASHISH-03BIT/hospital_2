const mongoose = require("mongoose");

const categories = [
  "electronics",
  "books",
  "id_cards",
  "clothing",
  "accessories",
  "documents",
  "other",
];

const foundItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [2, "Title must be at least 2 characters"],
      maxlength: [120, "Title cannot exceed 120 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: categories,
        message: `Category must be one of: ${categories.join(", ")}`,
      },
    },
    locationFound: {
      type: String,
      required: [true, "Location found is required"],
      trim: true,
      maxlength: [200, "Location cannot exceed 200 characters"],
    },
    dateFound: {
      type: Date,
      required: [true, "Date found is required"],
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: {
        values: ["lost", "found", "resolved"],
        message: "Status must be lost, found, or resolved",
      },
      default: "found",
    },
    claimed: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

foundItemSchema.index({ title: "text", description: "text", category: "text" });

module.exports = mongoose.model("FoundItem", foundItemSchema);
