import { Schema, model } from "mongoose";
import { IProduct } from "../interfaces/product.interface";

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: String,
      required: true,
    },
    affiliate_link: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    season: {
      type: [String],
      default: [],
    },
    ageGroup: {
      type: [String],
      default: [],
    },
    type: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", productSchema);
