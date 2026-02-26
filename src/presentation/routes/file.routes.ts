import { Router } from "express";
import { upload } from "../middlewares/upload";
import { FileController } from "../controllers/FileController";
import { authMiddleware, rbacMiddleware } from '../middlewares';


export const fileRoutes = Router();
const controller = new FileController();

fileRoutes.post(
  "/",
  authMiddleware,
  upload.single("file"),
  (req,res)=>controller.upload(req,res)
);

fileRoutes.delete(
  "/:id",
  authMiddleware,
  (req,res)=>controller.delete(req,res)
);

