import { Schema, model } from "mongoose";
import { ICategory } from "../interfaces/product.interface";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", categorySchema);
