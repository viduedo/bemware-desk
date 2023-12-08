// app/api/tickets/route.ts
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(req: NextRequest, { params }: any) {
  // Verificador de sessão
  /*const session = await getServerSession(authOptions)
  if (!session || session.user.role != "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }*/

  const ticketId = params.ticketId

  try {
    const ticketMsgs = await prisma.ticketMsg.findMany({
      where: { ticketId: Number(ticketId) },
      orderBy: { id: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json({ ticketMsgs }, { status: 200 })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
