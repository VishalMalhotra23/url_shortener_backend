const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortUrl: { type: String, required: true, unique: true },
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;
