import supertest from "supertest";
import {app} from "../../src/app";
import {prisma} from "../../src/lib/prisma"
import { describe, test, expect, afterAll, beforeAll } from "@jest/globals";

const request = supertest(app);

describe("Integração com Módulo: Tickets", () => {
  // Antes de testar a aplicação, limpar todos os tickets
  beforeAll(async () =>{
    await prisma.ticket.deleteMany();
  });

  // Depois de tudo, fechar conexão com o banco
  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("Criação de um ticket e deve retornar 201", async () => {

   
    const data = {
       // Texto para classificação do ticket
       textoSolicitacao: "Preciso conversar com financeiro, por questões de pagamento na empresa",
    }

     // Ação que deve ser feita
     const response = await request.post("/tickets").send(data);

     // Resultado do ticket
     console.log(" Criação do Ticket: ", response.body);

     // Resultados
     expect(response.status).toBe(201);
     expect(response.body).toHaveProperty("id");
     expect(response.body.canal).toBe("financeiro");
  })
})