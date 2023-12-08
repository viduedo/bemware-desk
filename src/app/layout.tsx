import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import NextAuthProvider from "./context/NextAuthProvider"
import { CustomFlowbiteTheme, Flowbite } from "flowbite-react"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WareDesk",
  description: "Um sistema BemWare!",
}

const customTheme: CustomFlowbiteTheme = {
  tabs: {
    base: "flex flex-col gap-2",
    tablist: {
      styles: {
        underline:
          "flex-wrap -mb-px border-b border-gray-200 dark:border-gray-700",
      },
      tabitem: {
        styles: {
          underline: {
            base: "rounded-t-lg focus:ring-0",
            active: {
              on: "text-violet-600 rounded-t-lg border-b-2 border-violet-600 active dark:text-violet-500 dark:border-violet-500",
              off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
            },
          },
        },
      },
    },
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body className="text-gray-800 font-inter">
        <NextAuthProvider>
          <Flowbite theme={{ theme: customTheme }}>{children} </Flowbite>
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
