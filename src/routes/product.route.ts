import { Router } from "express";
import { ProductControllers } from "../controllers/product.controller";
import { zodValidateRequest } from "../middlewares";
import { ProductValidation } from "../zod/product.validation";
import { auth } from "../middlewares/auth";

const router = Router();

// Product Routes
router
  .route("/")
  .get(ProductControllers.getAllProducts)
  .post(
    auth(),
    zodValidateRequest(ProductValidation.createProductValidationSchema),
    ProductControllers.createProduct
  );
router
  .route("/:id")
  .get(ProductControllers.getSingleProduct)
  .patch(
    auth(),
    zodValidateRequest(ProductValidation.updateProductValidationSchema),
    ProductControllers.updateProduct
  )
  .delete(auth(), ProductControllers.deleteProduct);

router
  .route("/categories")
  .get(ProductControllers.getAllCategories)
  .post(
    auth(),
    zodValidateRequest(ProductValidation.createCategoryValidationSchema),
    ProductControllers.createCategory
  );

router
  .route("/categories/:id")
  .get(ProductControllers.getSingleCategory)
  .patch(
    auth(),
    zodValidateRequest(ProductValidation.updateCategoryValidationSchema),
    ProductControllers.updateCategory
  )
  .delete(auth(), ProductControllers.deleteCategory);

export default router;
