import supertest from "supertest";
import {app} from "../../src/app";
import {prisma} from "../../src/lib/prisma"
import { describe, test, expect, afterAll, beforeAll } from "@jest/globals";

const resquest = supertest(app);

describe("Integração: Módulo de Usuários (/users)", () => {

  // Antes de testar a aplicação, limpar todos os usuarios
  beforeAll(async () =>{
    await prisma.usuario.deleteMany();
  });

  // Depois de tudo, fechar conexão com o banco
  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("Deve criar um novo usuário com sucesso e retornar status 201", async () => {
    // Dados do Body
    const newUser = {
      name: "Heitor Pedro",
      email: "heitoreis@gmail.com",
    }

    // Ação que deve ser feita
    const response = await resquest.post("/users").send(newUser);

    // Resultado do usuario
    console.log("Criação do Usuario", response.body);

    // Resultados
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toBe(newUser.email);
  });

  test("Deve retornar todos os usuarios do sistema e retornar 200", async () => {
    const response = await resquest.get("/users");

    console.log("Lista de usuarios: ", response.body);

    expect(response.status).toBe(200);
  });

  test("Deve apenas retornar um usuario com base no id", async () => {
    // Criação de um novo usuario
    const tempUser = {
      name: "Miguel Reis",
      email: "miguelreis@gmail.com",
    }

    // Ação de criar um novo usuario
    const createResponse = await resquest.post("/users").send(tempUser);

    // Captura o id
    const userId = createResponse.body.id;

    // Captura o usuario com base no id
    const response = await resquest.get(`/users/${userId}`);

    // Resultados 
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", userId);
    expect(response.body.name).toBe(tempUser.name);
    expect(response.body.email).toBe(tempUser.email);
  });

   test("Deve deletar usuario com base no id", async () => {
    // Criação de um novo usuario
    const tempUser = {
      name: "Eduardo Reis",
      email: "edureis@gmail.com",
    }

    // Ação de criar um novo usuario
    const createResponse = await resquest.post("/users").send(tempUser);

    // Captura o id
    const userId = createResponse.body.id;

    // Captura o usuario com base no id
    const response = await resquest.delete(`/users/${userId}`);

    // Resultados 
    expect(response.status).toBe(204);
  });

  test("Deve atualizar usuario com base no id", async () => {
    // Criação de um novo usuario
    const tempUser = {
      name: "Pedro Reis",
      email: "pedroreis@gmail.com",
    }

    // Ação de criar um novo usuario
    const createResponse = await resquest.post("/users").send(tempUser);

    // Captura o id
    const userId = createResponse.body.id;

    
    // Criação do novo dado
    const newUpdate = {
      email: "reispedro@gmail.com",
    }

    // Ação que deve ser feita
    const response = await resquest.put(`/users/${userId}`).send(newUpdate);

    // Resultados 
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", userId);
    expect(response.body.email).toBe("reispedro@gmail.com");
  });
})