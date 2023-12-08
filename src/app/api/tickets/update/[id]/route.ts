// app/api/tickets/update/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: NextRequest, { params }: any) {
  try {
    const data = await req.json()

    const { titulo, prioridade, topicoId } = data

    console.log(topicoId)

    // Verifica se algumas das variaveis estão vazias
    if (!titulo || !prioridade || !topicoId)
      return NextResponse.json("Ops! parece que ocorreu algum problema...", {
        status: 500,
      })

    // Atualiza o Ticket
    const updatedTicket = await prisma.ticket.update({
      where: { id: Number(params.id) },
      data: {
        titulo: titulo,
        prioridade: prioridade,
        topicoId: Number(topicoId),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json("Ticket atualizado!", { status: 201 })
  } catch (error) {
    console.error("Error updating ticket:", error)
    return NextResponse.json("Internal Server Error", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
