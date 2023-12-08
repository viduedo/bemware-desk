// app/api/ticketMsgs/create/route.ts
import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const { mensagem, userId, ticketId } = data

    // Cadastra uma nova mensagem
    const createdTicketMsg = await prisma.ticketMsg.create({
      data: {
        conteudo: mensagem,
        userId: Number(userId),
        ticketId: Number(ticketId),
      },
    })

    return NextResponse.json("Mensagem enviada!", { status: 201 })
  } catch (error) {
    console.error("Error creating message:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
