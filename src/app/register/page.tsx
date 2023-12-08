"use client"

import { useRouter } from "next/navigation"
import { SyntheticEvent, useState } from "react"

export default function RegisterPage() {
  const router = useRouter()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const registerUser = async (event: SyntheticEvent) => {
    event.preventDefault()
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    })

    const userInfo = response
    console.log("userInfo")
    router.push("/login")
  }

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://source.unsplash.com/random"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Faça o seu cadastro!
          </h1>

          <form className="mt-6" onSubmit={registerUser} method="POST">
            <div>
              <label className="block text-gray-700">Nome Completo</label>
              <input
                id="name"
                type="text"
                name="name"
                autoComplete="name"
                value={data.name}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value })
                }}
                placeholder="Digite seu nome completo"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                value={data.email}
                onChange={(e) => {
                  setData({ ...data, email: e.target.value })
                }}
                placeholder="Digite um email"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Senha</label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="password"
                value={data.password}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value })
                }}
                placeholder="Digite uma senha"
                minLength={6}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
            >
              Cadastrar-se
            </button>
          </form>

          <hr className="my-6 border-gray-300 w-full" />

          <p className="mt-8">
            Já possui um cadastro?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Faça o Login
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
