import { Modal, Label, TextInput, Textarea } from "flowbite-react"
import { useEffect, useState } from "react"

import Loader from "../Loader"
import { useTicketContext } from "@/app/context/TicketContext"

interface ModalProps {
  ticketId: number
  handleModal: () => void
  openModal: boolean
}

export default function ViewTicketModal({
  ticketId,
  handleModal,
  openModal,
}: ModalProps) {
  //const [ticket, setTicket] = useState<Ticket>()
  const ticket = useTicketContext()
  const [loading, setLoading] = useState(true)

  // realizar uma chamada de api GET ...
  const apiGetTicket = () => {
    fetch(`/api/tickets/${ticketId}/`)
      .then((res) => res.json())
      .then((data) => {
        //setTicket(data.ticket)
      })
  }

  const delay = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setLoading(false)
        resolve()
      }, 4000)
    })
  }

  useEffect(() => {
    //apiGetTicket()
    delay()
  }, [openModal])

  function dismissAndReset() {
    handleModal()
    setLoading(true)
  }

  return (
    <Modal show={openModal} onClose={dismissAndReset}>
      <Modal.Header>Visualização de Ticket</Modal.Header>
      <Modal.Body>
        {ticket.tickets.map((ticket, index) => {
          if (ticket.id === ticketId) {
            return (
              <form key={index} className="flex max-w flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Aberto por" />
                  </div>
                  {loading ? (
                    <Loader loadingType="input" isLoading />
                  ) : (
                    <TextInput
                      color="purple"
                      id="name"
                      type="text"
                      value={ticket?.user.name!}
                      disabled
                      shadow
                    />
                  )}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="E-mail" />
                  </div>
                  {loading ? (
                    <Loader loadingType="input" isLoading />
                  ) : (
                    <TextInput
                      color="purple"
                      id="email"
                      type="email"
                      value={ticket?.user.email!}
                      disabled
                      shadow
                    />
                  )}
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="topico" value="Tópico de Ajuda" />
                  </div>
                  {loading ? (
                    <Loader loadingType="input" isLoading />
                  ) : (
                    <TextInput
                      color="purple"
                      id="topico"
                      type="text"
                      value={ticket?.ticketTopico.topico}
                      disabled
                      shadow
                    />
                  )}
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="assunto" value="Assunto" />
                  </div>
                  {loading ? (
                    <Loader loadingType="input" isLoading />
                  ) : (
                    <TextInput
                      color="purple"
                      id="assunto"
                      type="text"
                      value={ticket?.titulo}
                      disabled
                      shadow
                    />
                  )}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="mensagem" value="Detalhes" />
                  </div>
                  {loading ? (
                    <Loader loadingType="input" isLoading />
                  ) : (
                    <Textarea
                      color="purple"
                      id="mensagem"
                      value={ticket?.titulo}
                      rows={4}
                      disabled
                      shadow
                    />
                  )}
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="prioridade" value="Nível de Prioridade" />
                  </div>
                  {loading ? (
                    <Loader loadingType="input" isLoading />
                  ) : (
                    <TextInput
                      color="purple"
                      id="prioridade"
                      type="text"
                      value={ticket?.prioridade}
                      disabled
                      shadow
                    />
                  )}
                </div>
              </form>
            )
          }
        })}
      </Modal.Body>
    </Modal>
  )
}
