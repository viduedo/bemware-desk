"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login")
    },
  })

  return (
    status === "authenticated" && (
      <main className="m-4">
        <section>
          <div>
            Status: {status}
            <hr />
            Nome: {session?.user.name}
            <hr />
            Nivel de permissao: {session?.user.role}
          </div>
        </section>
      </main>
    )
  )
}
