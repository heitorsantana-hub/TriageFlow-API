-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('aberto', 'em_andamento', 'resolvido');

-- CreateEnum
CREATE TYPE "TicketPrioridade" AS ENUM ('BAIXA', 'MEDIA', 'ALTA');

-- CreateEnum
CREATE TYPE "TicketCanal" AS ENUM ('ouvidoria', 'sac', 'suporte_tecnico', 'financeiro', 'fora_do_escopo');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "textoSolicitacao" TEXT NOT NULL,
    "canal" "TicketCanal" NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'aberto',
    "prioridade" "TicketPrioridade" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
