import express, { Router } from "express";
import healthRoutes from "./health.route";
import userRoutes from "./user.route";
import authRoutes from "./auth.route";

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/users", userRoutes);
router.use("/auths", authRoutes);

export const routerVersion1: Router = router;
