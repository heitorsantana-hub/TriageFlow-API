import type { Request, Response } from "express";
import { UserService } from "../services/UserService.js";
import { logger } from "../lib/logger.js"; // ✨ Importando seu logger estruturado

const userService = new UserService();
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validar e-mail

export class UserController {

  // Criando usuario
  create = async (req: Request, res: Response) => {
    try {
      const data = {
        name: req.body.name,
        email: req.body.email,
      }

      if (!data.name || typeof data.name !== "string" || data.name.trim() === "") {
        return res.status(400).json({ error: "O nome é obrigatório e deve ser um texto válido." });
      }

      if (!data.email || !emailRegex.test(data.email)) {
        return res.status(400).json({ error: "O e-mail fornecido é inválido ou está vazio." });
      }

      const user = await userService.createUser(data);
      return res.status(201).json(user);
    } catch (error) {
      logger.error({ err: error }, "Erro ao criar o usuário");
      return res.status(400).json({ error: "Erro ao criar o usuario" });
    }
  }

  // Listar todos usuarios
  getAll = async (req: Request, res: Response) => {
    try {
      const users = await userService.getAll();
      return res.status(200).json(users);
    } catch (error) {
      logger.error({ err: error }, "Erro ao listar todos os usuários");
      return res.status(400).json({ error: "Erro na listagem" });
    }
  }

  // Buscar usuario pelo id
  getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const idNumber = Number(id);

      if (isNaN(idNumber)) {
        return res.status(400).json({ error: "O ID fornecido não é um número válido" });
      }

      const user = await userService.getUserById(idNumber);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      return res.status(200).json(user);
    } catch (error) {
      logger.error({ err: error }, "Erro ao buscar usuário pelo ID");
      return res.status(400).json({ error: "Erro na busca" });
    }
  }

  // Deletar usuario
  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const idNumber = Number(id);

      if (isNaN(idNumber)) {
        return res.status(400).json({ error: "O ID fornecido não é um número válido" });
      }

      const user = await userService.delete(idNumber);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      return res.status(204).send();
    } catch (error) {
      logger.error({ err: error }, "Erro ao deletar o usuário");
      return res.status(400).json({ error: "Erro ao deletar o usuário" });
    }
  }

  // Atualizar Usuario
  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const idNumber = Number(id);

      if (isNaN(idNumber)) {
        return res.status(400).json({ error: "O ID fornecido não é um número válido." });
      }

      const { name, email } = req.body;
      const dataUpdate: { name?: string; email?: string } = {};


      if (name !== undefined) {
        if (typeof name !== "string" || name.trim() === "") {
          return res.status(400).json({ error: "O nome não pode ser um texto vazio." });
        }
        dataUpdate.name = name.trim();
      }

      if (email !== undefined) {
        if (!emailRegex.test(email)) {
          return res.status(400).json({ error: "O e-mail fornecido é inválido." });
        }
        dataUpdate.email = email.trim();
      }


      if (Object.keys(dataUpdate).length === 0) {
        return res.status(400).json({ error: "Nenhum dado foi fornecido para atualização." });
      }

      const updatedUser = await userService.updateUser(idNumber, dataUpdate);
      return res.status(200).json(updatedUser);
    } catch (error) {
     
      logger.error({ err: error }, "Erro ao atualizar o usuário");
      return res.status(400).json({ error: "Erro ao atualizar o usuário" });
    }
  }
}