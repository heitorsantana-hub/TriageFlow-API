import supertest from "supertest";
import { app } from "../../src/app";
import { prisma } from "../../src/lib/prisma";
import { describe, test, expect, afterAll, beforeAll, jest } from "@jest/globals";
import {ai} from "../../src/services/TicketService";

const request = supertest(app);

jest.spyOn(ai.models, "generateContent").mockImplementation(async (params: any) => {
  const prompt = params.contents.toString().toLowerCase();

  let canal = "fora_do_escopo";
  let prioridade = "BAIXA";

  // Buscando por trechos específicos de cada teste para não conflitar com as regras do prompt
  if (prompt.includes("questões de pagamento na empresa")) {
    canal = "financeiro"; 
    prioridade = "MEDIA";
  } else if (prompt.includes("preços e planos")) {
    canal = "sac"; 
    prioridade = "BAIXA";
  } else if (prompt.includes("denúncia confidencial")) {
    canal = "ouvidoria"; 
    prioridade = "ALTA";
  } else if (prompt.includes("computador travou") || prompt.includes("fora do ar")) {
    canal = "suporte_tecnico"; 
    prioridade = "MEDIA";
  }

  return {
    text: JSON.stringify({ canal, prioridade })
  } as any; 
});

describe("Integração com Módulo: Tickets", () => {
  beforeAll(async () => {
    await prisma.ticket.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("Criação de um ticket e deve retornar 201", async () => {
    const data = {
       // A IA real vai ler isso e classificar corretamente como "financeiro"
       textoSolicitacao: "Preciso conversar com financeiro, por questões de pagamento na empresa",
    };

    const response = await request.post("/tickets").send(data);

    console.log(" Criação do Ticket: ", response.body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.canal).toBe("financeiro");
    expect(response.body.prioridade).toBe("MEDIA");
  });
});