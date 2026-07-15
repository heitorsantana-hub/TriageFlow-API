import supertest from "supertest";
import {app} from "../../src/app";
import {prisma} from "../../src/lib/prisma"
import { describe, test, expect, afterAll, beforeAll } from "@jest/globals";

const request = supertest(app);

describe("Integração: Regras de Classificação de Tickets", () => {
  // Limpa o banco antes de começar os testes de classificação
  beforeAll(async () => {
    await prisma.ticket.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("Deve classificar como 'suporte' e prioridade 'MEDIA' para problemas técnicos urgentes", async () => {
    const data = {
      textoSolicitacao : "O sistema está fora do ar e meu computador travou, preciso de ajuda urgente!",
    }

    // Ação que deve ser feita
    const response = await request.post("/tickets").send(data);

    console.log("Resultado do Ticket", response.body);

    expect(response.status).toBe(201);
    expect(response.body.canal).toBe("suporte_tecnico");
    expect(response.body.prioridade).toBe("MEDIA");
  });

  test("Deve classificar como 'sac' e prioridade 'BAIXA' para dúvidas de novos produtos", async () => {
    const data = {
      textoSolicitacao: "Gostaria de saber os preços e planos para contratar o serviço de vocês.",
    }
      // Ação que deve ser feita
      const response = await request.post("/tickets").send(data);

      // Resultado ticket 
      console.log("Resultado do ticket: ", response.body);

      //Resultados
      expect(response.status).toBe(201);
      expect(response.body.canal).toBe("sac");
      expect(response.body.prioridade).toBe("BAIXA");
    }
  );

  test("Deve classificar como 'ouvidoria' e prioridade 'ALTA' para denúncias ou fraudes", async () => {
  const data = {
    textoSolicitacao: "Quero fazer uma denúncia confidencial sobre um caso de fraude financeira e assédio moral que está acontecendo no meu setor.",
  }
  
  const response = await request.post("/tickets").send(data);

  console.log("Resultado do ticket (Ouvidoria): ", response.body);

  expect(response.status).toBe(201);
  expect(response.body.canal).toBe("ouvidoria");
  expect(response.body.prioridade).toBe("ALTA");
  });

  test("Deve classificar como 'fora_do_escopo' para mensagens vagas ou sem contexto", async () => {
  const data = {
    textoSolicitacao: "Olá, bom dia! Gostaria de saber uma receita de bolo de cenoura e se vai chover amanhã.",
  }
  
  const response = await request.post("/tickets").send(data);

  console.log("Resultado do ticket (Fora do Escopo): ", response.body);

  expect(response.status).toBe(201);
  expect(response.body.canal).toBe("fora_do_escopo");
  // Dependendo de como a IA foi instruída, ela pode retornar BAIXA ou até colocar a prioridade para revisão manual
  expect(response.body.prioridade).toBe("BAIXA"); 
  });

  
  });