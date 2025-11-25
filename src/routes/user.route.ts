// src/routes/user.route.ts
import express from "express";
import { UserRepository } from "../repositories/user.repository.ts";
import { UserController } from "../controllers/user.controller.ts";

const router = express.Router();

const userRepo = new UserRepository();
const userController = new UserController(userRepo);

// POST new user
router.post("/", userController.createUser);

// PUT update user
router.put("/:id", userController.updateUser);

// DELETE user
router.delete("/:id", userController.deleteUser);

// GET single user
router.get("/:id", userController.getUserById);

// GET all users
router.get("/", userController.getAllUsers);

export default router;