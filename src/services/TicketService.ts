import {GoogleGenAI} from "@google/genai";
import {TicketRepository} from "../repositories/TicketRepository.js";
import {logger} from "../lib/logger.js";

const ticketRepository = new TicketRepository();

// Inicializar a IA
export const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

export class TicketService {

  // Criando o ticket
  async createTicket(ticketData: { textoSolicitacao: string }){

    // Prompt para treinar a IA
    const prompt = `
      Você é um especialista em triagem de atendimento ao cliente. 
      Analise o seguinte texto de solicitação e classifique-o seguindo as regras abaixo:

      Texto da solicitação: "${ticketData.textoSolicitacao}"

      Regras para CANAL:
      - 'ouvidoria': Denúncias, assédio, fraude, corrupção ou temas de conduta ética.
      - 'sac': Problemas com produto, entrega, assinatura, cancelamento ou atendimento.
      - 'suporte_tecnico': Erros de acesso, bugs, falhas de sistema ou instabilidade.
      - 'financeiro': Cobrança, pagamento ou reembolso.
      - 'fora_do_escopo': Mensagens vagas, sem contexto suficiente ou fora do cenário.

      Regras para PRIORIDADE:
      - 'ALTA': Denúncias, assédio, fraude e situações sensíveis.
      - 'MEDIA': Impactos no uso do serviço, acesso ou cobrança.
      - 'BAIXA': Casos genéricos ou sem urgência evidente.

      Responda ESTRITAMENTE em formato JSON puro, sem formatação markdown (sem os caracteres \`\`\`json), contendo as chaves: "canal" e "prioridade".
    `;

    try {
      // Chamar a Inteligência Artificial
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      // Converter a resposta em texto para um objeto Js
      const iaResponseText = response.text ? response.text.trim() : "{}";
      const classification = JSON.parse(iaResponseText);

      // Validação de dados
       const validCanals = ["ouvidoria", "sac", "suporte_tecnico", "financeiro", "fora_do_escopo"];
      const validPriorities = ["ALTA", "MEDIA", "BAIXA"];

      if (classification.canal && validCanals.includes(classification.canal)) {
        classification.canal = classification.canal as "ouvidoria" | "sac" | "suporte_tecnico" | "financeiro" | "fora_do_escopo";
      }

      if (classification.prioridade && validPriorities.includes(classification.prioridade.toUpperCase())) {
        classification.prioridade = classification.prioridade.toUpperCase() as "ALTA" | "MEDIA" | "BAIXA";
      }

      // Juntar todos os dados
      const finalTicketData = {
        textoSolicitacao: ticketData.textoSolicitacao,
        canal: classification.canal || "fora_do_escopo",
        prioridade: classification.prioridade || "BAIXA",
      }
      
      // Salvando no banco tudo
      return await ticketRepository.createTicket(finalTicketData);
    } catch (error) {
      logger.error(
        { err: error, textoSolicitacao: ticketData.textoSolicitacao },
        "Falha ao classificar ticket com o Gemini. Aplicando fallback 'fora_do_escopo'"
      );
    }
    
    // Criação do Fallback
    return await ticketRepository.createTicket({
        textoSolicitacao: ticketData.textoSolicitacao,
        canal: "fora_do_escopo",
        prioridade: "BAIXA"
      });
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