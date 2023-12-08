"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function AdminHome() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login")
    },
  })

  console.log(session)

  // ROLES RESTRITOS
  if (session?.user.role === "USER") {
    redirect("/denied")
  }

  return (
    status === "authenticated" &&
    session.user.role === "ADMIN" && (
      <main>
        <section>
          <h1>PÁGINA PARA APENAS ADMINISTRADORES</h1>
          <div>
            Status: {status}
            <hr />
            Nome: {session.user.name}
            <hr />
            Nivel de permissao: {session.user.role}
          </div>
        </section>
      </main>
    )
  )
}
