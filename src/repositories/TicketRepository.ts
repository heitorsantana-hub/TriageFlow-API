import {prisma} from '../lib/prisma.js';

 // Tipos para ajudar o TypeScript a inferir os tipos corretos
  interface CreateTicket {
    textoSolicitacao: string;
    canal: "ouvidoria" | "sac" | "suporte_tecnico" | "financeiro" | "fora_do_escopo";
    prioridade: "BAIXA" | "MEDIA" | "ALTA";
  }

export class TicketRepository {

  // Criando um novo ticket
  async createTicket(data: CreateTicket){
    return await prisma.ticket.create({
      data: {
        textoSolicitacao: data.textoSolicitacao,
        canal: data.canal,
        prioridade: data.prioridade
      }
    })
  }

  // Listando todos os tickets
  async findAll(){
    return await prisma.ticket.findMany({
      orderBy: {
        createdAt: 'desc' //Ordem decrescente 
      }
    })
  }
  
  // Buscando o ticket pelo id
  async getTicketById(id: number){
    return await prisma.ticket.findUnique({
      where: {id},
    })
  }

  // Atualizando o status de um ticket
  async updateStatus(id: number, status: "aberto" | "em_andamento" | "resolvido"){
    return await prisma.ticket.update({
      where: {id},
      data: { status: status as any}
    })
  }

  // Deletando um ticket
  async delete(id: number){
    return await prisma.ticket.delete({
      where: {id}
    });
  }


}