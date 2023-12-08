// app/api/tickets/route.ts
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  // Verificador de sessão
  /*const session = await getServerSession(authOptions)
  if (!session || session.user.role != "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }*/

  try {
    const ticketTopicos = await prisma.ticketTopico.findMany()
    return NextResponse.json({ ticketTopicos }, { status: 200 })
  } catch (error) {
    console.error("Error fetching ticketTopicos:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
