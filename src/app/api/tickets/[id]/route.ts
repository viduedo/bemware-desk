// app/api/tickets/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: NextRequest, { params }: any) {
  const ticketId = params.id

  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: Number(ticketId) },
      include: {
        ticketTopico: {
          select: {
            id: true,
            topico: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json({ ticket }, { status: 200 })
  } catch (error) {
    console.error("Error fetching ticket:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
