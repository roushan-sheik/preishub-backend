import { z } from "zod";

const createProductValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Product title is required",
        invalid_type_error: "Title must be a string",
      })
      .min(1, "Title cannot be empty"),

    image: z
      .string({
        required_error: "Product image is required",
        invalid_type_error: "Image must be a string",
      })
      .url("Image must be a valid URL"),

    description: z.string().optional(),

    price: z
      .string({
        required_error: "Product price is required",
        invalid_type_error: "Price must be a string",
      })
      .min(1, "Price cannot be empty"),

    affiliate_link: z
      .string({
        required_error: "Affiliate link is required",
        invalid_type_error: "Affiliate link must be a string",
      })
      .url("Affiliate link must be a valid URL"),

    category: z
      .string({
        required_error: "Category is required",
        invalid_type_error: "Category must be a string",
      })
      .min(1, "Category cannot be empty"),

    brand: z.string().optional(),

    season: z.array(z.string()).optional().default([]),

    ageGroup: z.array(z.string()).optional().default([]),

    type: z.string().optional(),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title cannot be empty").optional(),
    image: z.string().url("Image must be a valid URL").optional(),
    description: z.string().optional(),
    price: z.string().min(1, "Price cannot be empty").optional(),
    affiliate_link: z
      .string()
      .url("Affiliate link must be a valid URL")
      .optional(),
    category: z.string().min(1, "Category cannot be empty").optional(),
    brand: z.string().optional(),
    season: z.array(z.string()).optional(),
    ageGroup: z.array(z.string()).optional(),
    type: z.string().optional(),
  }),
});

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Category name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(1, "Name cannot be empty"),

    description: z.string().optional(),
  }),
});

const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name cannot be empty").optional(),
    description: z.string().optional(),
  }),
});

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
