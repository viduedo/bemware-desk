"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login")
    },
  })

  if (status === "authenticated" && session.user.role === "USER") {
    redirect("/client/")
  }

  if (status === "authenticated" && session.user.role === "ADMIN") {
    redirect("/admin/")
  }

  return (
    <main>
      <section>
        <p>Redirecting ...</p>
      </section>
    </main>
  )
}
