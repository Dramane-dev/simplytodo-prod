import express, { Router } from "express";
import { SignupController } from "../../controllers/auth/SignupController";
import { SigninController } from "../../controllers/auth/SigninController";
import { SignoutController } from "../../controllers/auth/SignoutController";
import { getUserByIdController } from "../../controllers/auth/getUserByIdController";
import { updateUserInfoController } from "../../controllers/auth/updateUserInfoController";
import { getAllUsersController } from "../../controllers/auth/getAllUsersController";
import { verifyMailController } from "../../controllers/auth/verifyMailController";
import { isAuthenticatedController } from "../../controllers/auth/isAuthenticatedController";

const authRoutes: Router = express.Router();
authRoutes.post("/signup", SignupController);
authRoutes.post("/verify-mail/:id", verifyMailController);
authRoutes.post("/signin", SigninController);
authRoutes.get("/user/:id", getUserByIdController);
authRoutes.get("/users", getAllUsersController);
authRoutes.put("/user/:id", updateUserInfoController);
authRoutes.delete("/signout", SignoutController);
authRoutes.get("/is-authenticated/:id", isAuthenticatedController);

export { authRoutes };
