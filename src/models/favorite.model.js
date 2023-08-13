import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
  "Favorite",
  mongoose.Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    mediaType: {
      type: String,
      enum: ["tv", "movie"],
      required: false
    },
    mediaId: {
      type: String,
      required: false
    },
    mediaTitle: {
      type: String,
      required: false
    },
    mediaPoster: {
      type: String,
      required: false
    },
    mediaRate: {
      type: Number,
      required: false
    },
  })
);