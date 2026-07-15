# 1. Usar uma imagem leve do Node.js
FROM node:20-alpine

# 2. Criar o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# 3. Copiar os arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# 4. Instalar as dependências do projeto
RUN npm install

# 5. Copiar o restante dos arquivos do projeto
COPY . .

# 6. Gerar o cliente do Prisma para o ambiente do container
RUN npx prisma generate

# 7. Expor a porta padrão da aplicação
EXPOSE 8989

# 8. Comando para rodar as migrations do banco e iniciar a API
CMD ["sh", "-c", "npx prisma db push && npm run dev"]