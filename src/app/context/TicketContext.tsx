import {
  TicketPrioridade,
  TicketStatus,
  TicketTopico,
  User,
} from "@prisma/client"

import {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react"

import toast from "react-hot-toast"

type Ticket = {
  id: number
  titulo: string
  status: TicketStatus
  prioridade: TicketPrioridade
  createdAt: string
  updatedAt: string
  topicoId: number
  user: User
  ticketTopico: TicketTopico
}

type TicketMsg = {
  id: number
  conteudo: string
  createdAt: Date
  updatedAt: Date
  ticketId: number
  userId: number
  user: User
}

interface TicketContextProps {
  children: ReactNode
}

interface TicketContextData {
  selectedId: number
  ticket: Ticket | undefined
  tickets: Ticket[]
  ticketTopicos: TicketTopico[]
  ticketMsgs: TicketMsg[]
  isLoading: boolean
  addTicket: (data: any) => Promise<void>
  addTicketMsg: (data: any) => Promise<void>
  editTicket: (data: any, ticketId: number) => Promise<void>
  setSelectedId: Dispatch<SetStateAction<number>>
}

export const TicketContext = createContext<TicketContextData>(
  {} as TicketContextData
)

export const TicketContextProvider = ({ children }: TicketContextProps) => {
  const [selectedId, setSelectedId] = useState(0)
  const [ticket, setTicket] = useState<Ticket>()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [ticketTopicos, setTicketTopicos] = useState<TicketTopico[]>([])
  const [ticketMsgs, setTicketMsgs] = useState<TicketMsg[]>([])
  const [isLoading, setIsLoading] = useState(true)

  function getTicketById(ticketId: number) {
    const ticket = tickets.find((ticket) => ticket.id === ticketId)
    setTicket(ticket)
  }

  async function getTickets() {
    setIsLoading(true)
    const apiEndpoint = "/api/tickets"
    fetch(apiEndpoint)
      .then((res) => res.json())
      .then((data) => {
        setTickets(data.tickets)
      })
  }

  async function getTicketMsgsByTicketId(ticketId: number) {
    setIsLoading(true)
    const apiEndpoint = `/api/ticketMsgs/${ticketId}/`
    fetch(apiEndpoint)
      .then((res) => res.json())
      .then((data) => {
        setTicketMsgs(data.ticketMsgs)
      })
  }

  async function getTicketTopicos() {
    setIsLoading(true)
    fetch("/api/ticketTopicos")
      .then((res) => res.json())
      .then((data) => {
        setTicketTopicos(data.ticketTopicos)
      })
  }

  async function addTicket(data: any) {
    setIsLoading(true)
    const apiEndpoint = "/api/tickets/create"
    fetch(apiEndpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        toast.success(response, { duration: 4000 })
      })
      .catch((error) => {
        toast.error(error, { duration: 4000 })
      })
  }

  async function addTicketMsg(data: any) {
    setIsLoading(true)
    const apiEndpoint = "/api/ticketMsgs/create/"

    fetch(apiEndpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        toast.success(response, { duration: 4000 })
      })
      .catch((error) => {
        toast.error(error, { duration: 4000 })
      })
  }

  async function editTicket(data: any, ticketId: number) {
    setIsLoading(true)
    const apiEndpoint = `/api/tickets/update/${ticketId}/`
    fetch(apiEndpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        let response = await res.json()
        if (response.status === 200 || 201) {
          toast.success(response, { duration: 4000 })
        } else {
          toast.error(response, { duration: 4000 })
        }
      })
      .catch(() => {
        toast.error("error", { duration: 4000 })
      })
  }

  function delay() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsLoading(false)
        resolve()
      }, 2000)
    })
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      getTickets()
      getTicketTopicos()
      getTicketById(selectedId)
      getTicketMsgsByTicketId(selectedId)
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [selectedId, addTicket, editTicket, addTicketMsg])

  return (
    <TicketContext.Provider
      value={{
        selectedId: selectedId,
        ticket: ticket,
        tickets: tickets,
        ticketTopicos: ticketTopicos,
        ticketMsgs: ticketMsgs,
        isLoading,
        addTicket,
        editTicket,
        addTicketMsg,
        setSelectedId,
      }}
    >
      {children}
    </TicketContext.Provider>
  )
}

export function useTicketContext() {
  const context = useContext(TicketContext)
  if (!context) {
    throw new Error(
      "useTicketContext must be used within a TicketContextProvider"
    )
  }

  return context
}
