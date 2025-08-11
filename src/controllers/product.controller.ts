// controllers/product.controller.ts
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ProductService } from "../services/product.service";

import ApiResponse from "../utils/ApiResponse";
import AsyncHandler from "../utils/AsyncHandler";

// Product Controllers
const getAllProducts = AsyncHandler(async (req: Request, res: Response) => {
  const result = await ProductService.getAllProducts(req.query);

  res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        result.result,
        "Products retrieved successfully",
        result.meta
      )
    );
});

const getSingleProduct = AsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductService.getSingleProduct(id);

  res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, result, "Product retrieved successfully")
    );
});

const createProduct = AsyncHandler(async (req: Request, res: Response) => {
  const result = await ProductService.createProduct(req.body);

  res
    .status(StatusCodes.CREATED)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        result,
        "Product created successfully"
      )
    );
});

const updateProduct = AsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductService.updateProduct(id, req.body);

  res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, result, "Product updated successfully")
    );
});

const deleteProduct = AsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await ProductService.deleteProduct(id);

  res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, null, "Product deleted successfully")
    );
});

// Category Controllers
const getAllCategories = AsyncHandler(async (req: Request, res: Response) => {
  const result = await ProductService.getAllCategories(req.query);

  res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        result.result,
        "Categories retrieved successfully",
        result.meta
      )
    );
});

const getSingleCategory = AsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductService.getSingleCategory(id);

  res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, result, "Category retrieved successfully")
    );
});

const createCategory = AsyncHandler(async (req: Request, res: Response) => {
  const result = await ProductService.createCategory(req.body);

  res
    .status(StatusCodes.CREATED)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        result,
        "Category created successfully"
      )
    );
});

const updateCategory = AsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductService.updateCategory(id, req.body);

  res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, result, "Category updated successfully")
    );
});

const deleteCategory = AsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await ProductService.deleteCategory(id);

  res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, null, "Category deleted successfully")
    );
});

export const ProductControllers = {
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
