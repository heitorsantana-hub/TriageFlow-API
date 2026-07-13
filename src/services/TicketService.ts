import {TicketRepository} from "../repositories/TicketRepository.js";

const ticketRepository = new TicketRepository();

export class TicketService {

  // Criando o ticket
  async createTicket(data: any){
      return await ticketRepository.createTicket(data);
  }

  // Listar todos os tickets
  async getAllTickets(){
    return await ticketRepository.findAll();
  }

  // Atualizar status do Ticket
  async updateStatus(id: number, status: "aberto" | "em_andamento" | "resolvido"){
    return await ticketRepository.updateStatus(id, status);
  }

  // Deletar o ticket
  async deleteTicket(id: number){
    return await ticketRepository.delete(id);
  }

  async getById(id: number){
    return await ticketRepository.getTicketById(id);
  }

}