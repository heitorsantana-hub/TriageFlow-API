import type { Request, Response } from "express";
import { UserService } from "../services/UserService.js";

const userService = new UserService();

export class UserController {

  // Criando usuario
  create = async (req: Request, res: Response) => {
    try {
      const data = {
        name: req.body.name,
        email: req.body.email,
      }

      const user = await userService.createUser(data);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({error: "Erro ao criar o usuario"});
    }
  }

  // Listar todos usuarios
  getAll = async (req: Request, res: Response) => {
    try {
      const users = await userService.getAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({error: "Erro na listagem"});
    }
  }

  // Buscar usuario pelo id
  getUserById = async (req: Request, res: Response) => {
    try {
      const id = req.params;
      const idNumber = Number(id);

      if(isNaN(idNumber)){
        res.status(400).json({ error: "O ID fornecido não é um número válido"});
      }

      const user = await userService.getUserById(idNumber);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({error: "Erro na busca"});
    }
  }

  // Deletar usuario
  delete = async (req: Request, res: Response) => {
    try {
      const id = req.body;
      const idNumber = Number(id);

      if(isNaN(idNumber)){
        res.status(400).json({ error: "O ID fornecido não é um número válido"});
      }

      await userService.delete(idNumber);
      res.status(204).send;
    } catch (error) {
      res.status(400).json({error: "Erro ao deletar o ticket"});
    }
  }

  // Atualizar Usuario
  updateUser = async (req: Request, res: Response) => {
    try {
      const {id} = req.params;
      const idNumber = Number(id);

      if (isNaN(idNumber)) {
         res.status(400).json({ error: "O ID fornecido não é um número válido." });
         return;
      }

      // Pega o nome e o email dentro do body
      const {name, email} = req.body;

      // Montagem de objeto para atualização
      const dataUpdate : {name?: string; email?: string } = {};

      // Atribuindo valor para objeto que vai ser atualizado
      if (name !== undefined) dataUpdate.name = name;
      if (email !== undefined) dataUpdate.email = email;

      // Se o usuário mandou um body vazio {}, não faz sentido chamar o banco
      if (Object.keys(dataUpdate).length === 0) {
         res.status(400).json({ error: "Nenhum dado foi fornecido para atualização." });
         return;
      }

      const updateUser = await userService.updateUser(idNumber, dataUpdate);
      res.status(200).json({updateUser});
    } catch (error) {
      
    }
  }

}