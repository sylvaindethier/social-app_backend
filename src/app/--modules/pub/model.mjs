import { Schema, Types, model } from "mongoose";
// Model relations
import "../user/model.mjs";

import { remove as file_path__remove } from "../../lib/uploads.mjs";
const image_path__remove = file_path__remove;

/**
 * PubSchema
 */
const PubSchema = Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    image_path: { type: String },
    created_at: { type: Date, required: true, default: Date.now },
    created_by: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    /** Statics */
    statics: {
      image_path__remove,
    },

    /** Methods */
    methods: {
      image_path__remove() {
        if (this.image_path) {
          image_path__remove(this.image_path);
          this.image_path = undefined;
        }
        return this;
      },
    },
  }
);

export const Pub = model("Pub", PubSchema);
export default Pub;
