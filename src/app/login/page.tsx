"use client"

import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { SyntheticEvent, useEffect, useState } from "react"

export default function LoginPage() {
  const { status } = useSession()
  const router = useRouter()
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    if (status === "authenticated") router.push("/")
  }, [status])

  const loginUser = async (event: SyntheticEvent) => {
    event.preventDefault()
    signIn("credentials", {
      ...data,
      redirect: false,
    })

    router.push("/")
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
            Faça login na sua conta
          </h1>

          <form className="mt-6" onSubmit={loginUser} method="POST">
            <div>
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
                placeholder="Digite seu email"
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
                placeholder="Digite sua senha"
                minLength={5}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="text-right mt-2">
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
            >
              Log In
            </button>
          </form>

          <hr className="my-6 border-gray-300 w-full" />

          <p className="mt-8">
            Não possui cadastro?{" "}
            <a
              href="/register"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Cadastrar-se
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
