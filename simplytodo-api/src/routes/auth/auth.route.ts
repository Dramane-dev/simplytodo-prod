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
authRoutes.post("/api/signup", SignupController);
authRoutes.post("/api/verify-mail/:id", verifyMailController);
authRoutes.post("/api/signin", SigninController);
authRoutes.get("/api/user/:id", getUserByIdController);
authRoutes.get("/api/users", getAllUsersController);
authRoutes.put("/api/user/:id", updateUserInfoController);
authRoutes.delete("/api/signout", SignoutController);
authRoutes.get("/api/is-authenticated/:id", isAuthenticatedController);

export { authRoutes };
