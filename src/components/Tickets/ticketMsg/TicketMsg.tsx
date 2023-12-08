import { useTicketContext } from "@/app/context/TicketContext"
import Loading from "@/components/Loader"
import { User } from "@prisma/client"
import { Timeline } from "flowbite-react"
import moment from "moment"
import { useEffect, useState } from "react"

interface TicketMsgProps {
  ticketId: number
  onChange?: () => void
}

type TicketMsg = {
  id: number
  conteudo: string
  createdAt: Date
  updatedAt: Date
  ticketId: number
  user: User
}

export default function TicketMsg({ ticketId, onChange }: TicketMsgProps) {
  const ticket = useTicketContext()
  ticket.setSelectedId(ticketId)

  useEffect(() => {}, [onChange])

  return (
    <div>
      {ticket.isLoading ? (
        <Loading loadingType="input" isLoading />
      ) : (
        <Timeline>
          {ticket.ticketMsgs.map((ticketMsg, index) => {
            return (
              <Timeline.Item key={index}>
                <Timeline.Point />
                <Timeline.Content>
                  <Timeline.Time>
                    {moment(ticketMsg.createdAt).format("DD/MM/yyyy HH:mm")}
                  </Timeline.Time>
                  <Timeline.Title>{ticketMsg.user.name}</Timeline.Title>
                  <Timeline.Body>{ticketMsg.conteudo}</Timeline.Body>
                </Timeline.Content>
              </Timeline.Item>
            )
          })}
        </Timeline>
      )}
    </div>
  )
}
