"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function Denied() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login")
    },
  })
  return (
    status === "authenticated" && (
      <main>
        <section>
          <div className="grid h-screen px-4 bg-white place-content-center">
            <div className="text-center">
              <h1 className="font-black text-gray-200 text-9xl">401</h1>

              <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Ops!
              </p>
              <p className="mt-4 text-gray-500">
                Parece que você não possui autorização para acessar esta
                página...
              </p>

              <Link
                href="/"
                className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
              >
                Voltar ao Início
              </Link>
            </div>
          </div>
        </section>
      </main>
    )
  )
}
