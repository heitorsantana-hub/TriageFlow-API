import type { Request, Response } from "express";
import { TicketService } from "../services/TicketService.js";

const ticketService = new TicketService();

export class TicketController {
  
  // Criando ticket
  create = async (req: Request, res: Response) => {
    try{
      const ticket = await ticketService.createTicket(req.body);
      res.status(201).json(ticket);
    }
    catch(error){
      res.status(400).json({ error: "Erro ao criar o ticket" });
    }
  }

  // Lista de tickets 
  getAll = async (req: Request, res: Response) => {
    try {
      const tickets = await ticketService.getAllTickets();
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar tickets. " });
    }
  }
 
  // Atualizar o status do ticket
  updateStatus = async (req: Request, res: Response) => {
    try {
      const {id} = req.params;
      const {status} = req.body;

      // Convertendo id de String para Inteiro
      const idNumber = Number(id);

      if(isNaN(idNumber)){
        res.status(400).json({ error: "O ID fornecido não é um número válido"});
      }
      
      const ticket = await ticketService.updateStatus(idNumber, status);
      res.status(201).json(ticket);
    } catch (error) {
      res.status(400).json({error: "Erro ao atualizar o status"});
    }
  };
  
  // Deletar ticket
  delete = async (req: Request, res: Response) => {
    try {
      const {id} = req.params;
      const idNumber = Number(id);

      if(isNaN(idNumber)){
        res.status(400).json({ error: "O ID fornecido não é um número válido"});
      }

      await ticketService.deleteTicket(idNumber);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({error: "Erro ao deletar o ticket"});
    }
  }

  // Buscar pelo id
  getById = async (req: Request, res: Response) => {
    try {
      const id = req.params;
      const idNumber = Number(id);

      if(isNaN(idNumber)){
        res.status(400).json({ error: "O ID fornecido não é um número válido"});
      }

      const ticket = await ticketService.getById(idNumber);
      res.status(201).json(ticket);
    } catch (error) {
      res.status(400).json({error: "Erro na busca"});
    }
  }

}