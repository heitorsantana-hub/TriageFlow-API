import { Router } from "express";
import { TicketController } from "../controllers/TicketController.js"; 

export const ticketRoutes = Router();
const ticketController = new TicketController();


// POST /tickets - Criação e classificação do ticket[cite: 1]
ticketRoutes.post("/", ticketController.create);

// GET /tickets - Consulta de todos os tickets[cite: 1]
ticketRoutes.get("/", ticketController.getAll);

// GET /tickets/:id - Consulta de um ticket específico[cite: 1]
ticketRoutes.get("/:id", ticketController.getById);

// PUT /tickets/:id/status - Atualização exclusiva do status[cite: 1]
ticketRoutes.put("/:id/status", ticketController.updateStatus);