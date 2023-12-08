"use client"

import { TicketContextProvider } from "@/app/context/TicketContext"

interface TicketLayoutProps {
  children: React.ReactNode
}

export default function TicketLayout({ children }: TicketLayoutProps) {
  return <TicketContextProvider>{children}</TicketContextProvider>
}
