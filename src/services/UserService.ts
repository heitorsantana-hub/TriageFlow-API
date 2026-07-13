import { UserRepository } from "../repositories/UserRepository.js";

const userRepository = new UserRepository();

export class UserService {

  // Criando um usuario
  async createUser(data: {name: string, email: string}){
    return await userRepository.createUser(data);
  }

  // Listar todos os usuarios
  async getAll(){
    return await userRepository.getAllUsers();
  }

  // Buscando usuario pelo id
  async getUserById(id: number){
    return await userRepository.getUserById(id);
  }

  // Deletar usuario
  async delete(id: number){
    return await userRepository.delete(id);
  }

  // Atualizar usuario
  async updateUser(id: number, data: {name?: string, email?: string}){
    return await userRepository.updateUser(id, data);
  }
}