// app/api/tickets/create/route.ts
import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const { titulo, mensagem, prioridade, userId, topicoId } = data

    // Cadastra o Ticket
    const createdTicket = await prisma.ticket.create({
      data: {
        titulo: titulo,
        prioridade: prioridade,
        userId: parseInt(userId),
        topicoId: parseInt(topicoId),
      },
    })

    // Cadastra a primeira mensagem
    const createdTicketMsg = await prisma.ticketMsg.create({
      data: {
        conteudo: mensagem,
        userId: createdTicket.userId,
        ticketId: createdTicket.id,
      },
    })

    return NextResponse.json("Ticket Cadastrado!", { status: 201 })
  } catch (error) {
    console.error("Error creating ticket:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
