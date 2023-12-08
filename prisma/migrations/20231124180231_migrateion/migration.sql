/*
  Warnings:

  - You are about to drop the column `descricao` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `numeracao` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `numeracao` on the `TicketMsg` table. All the data in the column will be lost.
  - Added the required column `topicoId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "descricao",
DROP COLUMN "numeracao",
ADD COLUMN     "topicoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TicketMsg" DROP COLUMN "numeracao";

-- CreateTable
CREATE TABLE "TicketTopico" (
    "id" SERIAL NOT NULL,
    "topico" TEXT NOT NULL,

    CONSTRAINT "TicketTopico_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_topicoId_fkey" FOREIGN KEY ("topicoId") REFERENCES "TicketTopico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
