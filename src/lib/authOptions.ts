import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions: AuthOptions = {
  // Session Strategy
  session: {
    strategy: "jwt",
  },
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,
  // Prisma Adapter
  adapter: PrismaAdapter(prisma),
  // Providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        // check to see if email and password is valid
        if (!credentials.email || !credentials.password) {
          return null
        }

        // check to see if there is no user, and create the first user, the administrator.
        const users = await prisma.user.findFirst()
        if (
          !users &&
          credentials.email === "admin@bemware.com.br" &&
          credentials.password === "admin"
        ) {
          // Cadastra a organização
          const organizacao = await prisma.organizacao.create({
            data: {
              razaoSocial: "Bemware: Soluções em TI",
              cnpj: "45.440.886/0001-66",
              endereco:
                "R. Elvira Cruz Leal, 787, Antártica - Praia Grande - SP.",
              telefone: "(13) 99610-4220",
              email: "daniel.viduedo@bemware.com.br",
              dominio: "bemware.com.br",
              isActive: true,
            },
          })

          // Cadastra o usuario
          const hashedPassword = await bcrypt.hash("admin", 10)

          const dbUser = await prisma.user.create({
            data: {
              name: "Administrador",
              email: "admin@bemware.com.br",
              hashedPassword: hashedPassword,
              role: "ADMIN",
              organizacaoId: organizacao.id,
            },
          })

          // return user object after creation
          const user = {
            id: dbUser.id.toString(),
            name: dbUser.name,
            email: dbUser.email,
            emailVerified: dbUser.emailVerified,
            image: dbUser.image,
            role: dbUser.role,
            organizacaoId: dbUser.organizacaoId.toString(),
          }
          return user
        }

        // check to see if user exists
        const dbUser = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        if (!dbUser) {
          return null
        }

        // check to see if passwords match
        const passwordsMatch = bcrypt.compare(
          credentials.password,
          dbUser.hashedPassword!
        )
        if (!passwordsMatch) {
          return null
        }

        // return user object if everything is valid
        const user = {
          id: dbUser.id.toString(),
          name: dbUser.name,
          email: dbUser.email,
          emailVerified: dbUser.emailVerified,
          image: dbUser.image,
          role: dbUser.role,
          organizacaoId: dbUser.organizacaoId.toString(),
        }
        return user
      },
    }),
  ],
  // Callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return { ...token, ...user }
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role
        session.user.id = token.id
      }

      return session
    },
  },
}
