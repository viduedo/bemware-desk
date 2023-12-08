import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, email, password } = body.data
  console.log(body.data)

  if (!name || !email || !password) {
    return new NextResponse("Missing name, email, or password", { status: 400 })
  }

  const exist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (exist) {
    return new NextResponse("User already exists", { status: 400 })
  }

  const organizacaoDominio = getDomainFromEmail(email)

  const organizacao = await prisma.organizacao.findFirst({
    where: { dominio: organizacaoDominio!, isActive: true },
  })

  if (!organizacao)
    return new NextResponse(
      "Organização inexistente ou bloqueada de cadastro.",
      { status: 401 }
    )

  const organizacaoId = Number(organizacao.id)
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
      organizacaoId,
    },
  })

  return NextResponse.json(user)
}

function getDomainFromEmail(email: string) {
  var regex = /@([^\s@]+)/
  var matches = email.match(regex)
  if (matches && matches.length > 1) {
    return matches[1]
  }
  return null
}
