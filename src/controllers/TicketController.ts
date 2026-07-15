import type { Request, Response } from "express";
import { TicketService } from "../services/TicketService.js";
import { logger } from "../lib/logger.js"; // ✨ Importando seu logger estruturado

const ticketService = new TicketService();

const validStatuses = ["aberto", "em_atendimento", "resolvido"];

export class TicketController {
  
  // Criando ticket
  create = async (req: Request, res: Response) => {
    try {
      const {textoSolicitacao} = req.body;

      if(!textoSolicitacao || typeof textoSolicitacao !== "string" || textoSolicitacao.trim() === ""){
        return res.status(400).json({ error: "O texto da solicitação é obrigatório e não pode ser vazio." });
      }

      const ticket = await ticketService.createTicket({textoSolicitacao: textoSolicitacao});
      return res.status(201).json(ticket);
    } catch (error) {
      logger.error({ err: error }, "Erro ao criar o ticket");
      return res.status(400).json({ error: "Erro ao criar o ticket" });
    }
  }

  // Lista de tickets 
  getAll = async (req: Request, res: Response) => {
    try {
      const tickets = await ticketService.getAllTickets();
      return res.status(200).json(tickets);
    } catch (error) {
      logger.error({ err: error }, "Erro ao buscar tickets");
      return res.status(500).json({ error: "Erro ao buscar tickets." });
    }
  }
 
  // Atualizar o status do ticket
  updateStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const idNumber = Number(id);


      // Validações
      if (isNaN(idNumber)) {
        return res.status(400).json({ error: "O ID fornecido não é um número válido" });
      }

      if(!status || !validStatuses.includes(status)){
        return res.status(400).json({ 
          error: `Status inválido. Escolha uma das opções: ${validStatuses.join(", ")}` 
        });
      }
      
      const ticket = await ticketService.updateStatus(idNumber, status);

      if (!ticket) {
        return res.status(404).json({ error: "Ticket não encontrado" });
      }

      return res.status(200).json(ticket); 
    } catch (error) {
      logger.error({ err: error }, "Erro ao atualizar o status do ticket");
      return res.status(400).json({ error: "Erro ao atualizar o status" });
    }
  };
  
  // Deletar ticket
  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const idNumber = Number(id);

      if (isNaN(idNumber)) {
        return res.status(400).json({ error: "O ID fornecido não é um número válido" });
      }

      await ticketService.deleteTicket(idNumber);
      return res.status(204).send(); 
    } catch (error) {
      logger.error({ err: error }, "Erro ao deletar o ticket");
      return res.status(400).json({ error: "Erro ao deletar o ticket" });
    }
  }

  // Buscar pelo id
  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const idNumber = Number(id);

      if (isNaN(idNumber)) {
        return res.status(400).json({ error: "O ID fornecido não é um número válido" });
      }

      const ticket = await ticketService.getById(idNumber);

      if (!ticket) {
        return res.status(404).json({ error: "Ticket não encontrado" });
      }

      return res.status(200).json(ticket); 
    } catch (error) {
      logger.error({ err: error }, "Erro na busca do ticket");
      return res.status(400).json({ error: "Erro na busca" });
    }
  }
}