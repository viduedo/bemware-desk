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

  const page = req.nextUrl.searchParams.get("page")

  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: { id: "desc" },
      include: {
        ticketTopico: {
          select: {
            topico: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json({ tickets }, { status: 200 })
  } catch (error) {
    console.error("Error fetching tickets:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
