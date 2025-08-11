import { Router } from "express";
import { AuthControllers } from "../controllers/auth.controller";
import { zodValidateRequest } from "../middlewares";
import { AuthValidation } from "../zod/auth.validation";
import { auth } from "../middlewares/auth";

const router = Router();

router
  .route("/register")
  .post(
    zodValidateRequest(AuthValidation.registerUserValidationSchema),
    AuthControllers.registerUser
  );
router
  .route("/login")
  .post(
    zodValidateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser
  );
router.route("/user/:id").get(auth(), AuthControllers.getSingleUser);

router
  .route("/change-password/:id")
  .patch(
    zodValidateRequest(AuthValidation.changePasswordValidationSchema),
    auth(),
    AuthControllers.changePassword
  );

router.route("/logout").post(AuthControllers.logoutUser);

export default router;
