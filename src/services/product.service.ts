import { StatusCodes } from "http-status-codes";
import { Product } from "../models/product.model";
import { Category } from "../models/category.model";
import {
  IProduct,
  ICreateProduct,
  IUpdateProduct,
  ICategory,
} from "../interfaces/product.interface";
import ApiError from "../utils/ApiError";
import { QueryBuilder } from "../builder/QueryBuilder";

// Product Services
const getAllProducts = async (query: Record<string, unknown>) => {
  // Define searchable fields for products
  const productSearchableFields = ["title", "brand", "description", "type"];

  const productQuery = new QueryBuilder(
    Product.find().populate("category"),
    query
  )
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getSingleProduct = async (id: string): Promise<IProduct | null> => {
  const product = await Product.findById(id).populate("category");
  if (!product) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Product not found");
  }
  return product;
};

const createProduct = async (payload: ICreateProduct): Promise<IProduct> => {
  // Check if category exists
  const categoryExists = await Category.findById(payload.category);
  if (!categoryExists) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Category not found");
  }

  // Check if product with same title already exists
  const existingProduct = await Product.findOne({ title: payload.title });
  if (existingProduct) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      "Product with this title already exists"
    );
  }

  const product = await Product.create(payload);
  return (await Product.findById(product._id).populate("category")) as IProduct;
};

const updateProduct = async (
  id: string,
  payload: IUpdateProduct
): Promise<IProduct> => {
  // Check if product exists
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Product not found");
  }

  // If category is being updated, check if it exists
  if (payload.category) {
    const categoryExists = await Category.findById(payload.category);
    if (!categoryExists) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Category not found");
    }
  }

  // Check if title is being updated and already exists for another product
  if (payload.title) {
    const existingProduct = await Product.findOne({
      title: payload.title,
      _id: { $ne: id },
    });
    if (existingProduct) {
      throw new ApiError(
        StatusCodes.CONFLICT,
        "Product with this title already exists"
      );
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate("category");

  return updatedProduct as IProduct;
};

const deleteProduct = async (id: string): Promise<void> => {
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Product not found");
  }

  await Product.findByIdAndDelete(id);
};

// Category Services
const getAllCategories = async (query: Record<string, unknown>) => {
  const categorySearchableFields = ["name", "description"];

  const categoryQuery = new QueryBuilder(Category.find(), query)
    .search(categorySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await categoryQuery.modelQuery;
  const meta = await categoryQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getSingleCategory = async (id: string): Promise<ICategory | null> => {
  const category = await Category.findById(id);
  if (!category) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Category not found");
  }
  return category;
};

const createCategory = async (payload: {
  name: string;
  description?: string;
}): Promise<ICategory> => {
  // Check if category with same name already exists
  const existingCategory = await Category.findOne({ name: payload.name });
  if (existingCategory) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      "Category with this name already exists"
    );
  }

  const category = await Category.create(payload);
  return category;
};

const updateCategory = async (
  id: string,
  payload: { name?: string; description?: string }
): Promise<ICategory> => {
  const category = await Category.findById(id);
  if (!category) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Category not found");
  }

  // Check if name is being updated and already exists for another category
  if (payload.name) {
    const existingCategory = await Category.findOne({
      name: payload.name,
      _id: { $ne: id },
    });
    if (existingCategory) {
      throw new ApiError(
        StatusCodes.CONFLICT,
        "Category with this name already exists"
      );
    }
  }

  const updatedCategory = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedCategory as ICategory;
};

const deleteCategory = async (id: string): Promise<void> => {
  const category = await Category.findById(id);
  if (!category) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Category not found");
  }

  // Check if any products are using this category
  const productsUsingCategory = await Product.findOne({ category: id });
  if (productsUsingCategory) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Cannot delete category as it is being used by products"
    );
  }

  await Category.findByIdAndDelete(id);
};

export const ProductService = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
