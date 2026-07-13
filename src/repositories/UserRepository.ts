import { prisma } from "../lib/prisma.js";

export class UserRepository {

  // Criando um novo usuário
  async createUser(data: {name: string, email: string}){
    return await prisma.usuario.create({
      data,
    })
  }

  // Listando todos os usuários
  async getAllUsers(){
    return await prisma.usuario.findMany();
  }

  // Buscando um usuário pelo ID
  async getUserById(id: number){
    return await prisma.usuario.findUnique({
      where: {id}
    })
  }

  // Atualizar Usuario
  async updateUser(id: number, data: {name?: string, email?: string}){
    return await prisma.usuario.update({
      where: {id},
      data,
    })
  }
  
  // Delete usuario
  async delete(id: number){
    return await prisma.usuario.delete({
      where: {id}
    })  
  }
}