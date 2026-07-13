import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

export const userRoutes = Router();
const userController = new UserController();

// POST /users - Cria um usuário
userRoutes.post("/", userController.create);

// GET /users - Lista todos os usuários
userRoutes.get("/", userController.getAll);

// GET /users/:id - Busca um usuário específico
userRoutes.get("/:id", userController.getUserById);

// PUT /users/:id - Atualiza um usuário
userRoutes.put("/:id", userController.updateUser);

// DELETE /users/:id - Deleta um usuário
userRoutes.delete("/:id", userController.delete);