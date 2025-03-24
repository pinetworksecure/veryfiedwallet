import { Router } from "express";
import { AppDataSource } from "../config/database.config";
import { PasswordController } from "../controller/password_comman";

const router = Router();
const passwordController = new PasswordController(AppDataSource);

router.get("/", passwordController.GetPasswords.bind(passwordController));
router.post("/", passwordController.CreatePassword.bind(passwordController));
router.get("/:id", passwordController.GetPassword.bind(passwordController));
router.put("/:id", passwordController.EditPassword.bind(passwordController));
router.delete(
  "/:id",
  passwordController.DeletePassword.bind(passwordController)
);

export default router;
