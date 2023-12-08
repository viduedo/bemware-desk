"use client"

import {
  Button,
  Label,
  Modal,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react"
import { ImSpinner9 } from "react-icons/im"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { TicketTopico } from "@prisma/client"
import Notification from "../Notification"
import Loader from "../Loader"
import { useTicketContext } from "@/app/context/TicketContext"

export type FormData = {
  titulo: string
  mensagem: string
  prioridade: string
  userId: number
  topicoId: number
}

interface ModalProps {
  handleModal: () => void
  openModal: boolean
}

export default function CreateTicketModal({
  handleModal,
  openModal,
}: ModalProps) {
  const { data: session, status } = useSession()
  const ticket = useTicketContext()
  const [ticketTopicos, setTicketTopicos] = useState<TicketTopico[]>([])
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState({
    visible: false,
    type: "", // Pode ser "success", "error", etc.
    message: "",
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const defaultValues = {
    topicoId: 1,
    assunto: "",
    mensagem: "",
    prioridade: "Normal",
  }

  function handleNotification(visible: boolean, type: string, message: string) {
    setNotification({ visible, type, message })
  }

  // realizar uma chamada de api POST ...
  const apiPost = async (data: FormData) => {
    const apiEndpoint = "/api/tickets/create"

    fetch(apiEndpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        setNotification({
          visible: true,
          type: "success",
          message: response,
        })
      })
      .catch((error) => {
        setNotification({
          visible: true,
          type: "error",
          message: error,
        })
      })
  }

  // realizar uma chamada de api GET ...
  const apiGet = () => {
    fetch("/api/ticketTopicos")
      .then((res) => res.json())
      .then((data) => {
        setTicketTopicos(data.ticketTopicos)
        setLoading(false)
      })
  }

  const delay = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
  }

  const onSubmit = async (data: FormData) => {
    console.log(data)
    // Realizar a chamada de api POST
    //await apiPost(data)
    ticket.addTicket(data)
    // Esperar 2 segundos
    await delay()
    // Fechar o modal
    handleModal()
    // Resetar o formulário
    reset(defaultValues)
  }

  useEffect(() => {
    apiGet()
  }, [])

  if (!ticketTopicos) return <p>No data</p>

  return (
    <>
      {notification.visible && (
        <Notification
          visible={notification.visible}
          type={notification.type}
          message={notification.message}
          handleNotification={handleNotification}
        />
      )}

      <Modal show={openModal} onClose={handleModal}>
        <Modal.Header>Abertura de Ticket</Modal.Header>
        <Modal.Body>
          <form
            className="flex max-w flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Nome" />
              </div>
              <TextInput
                color="purple"
                id="name"
                type="text"
                value={session?.user.name || ""}
                disabled
                shadow
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="E-mail" />
              </div>
              <TextInput
                color="purple"
                id="email"
                type="email"
                value={session?.user.email || ""}
                disabled
                shadow
              />
            </div>

            <div className="block">
              <Label htmlFor="topico" value="Tópico de Ajuda" />
            </div>
            {loading ? (
              <Loader loadingType="input" isLoading />
            ) : (
              <Select
                color="purple"
                id="topico"
                required
                {...register("topicoId")}
              >
                {ticketTopicos?.map((ticketTopico, index) => {
                  return (
                    <option key={index} value={ticketTopico.id}>
                      {ticketTopico.topico}
                    </option>
                  )
                })}
              </Select>
            )}

            <div>
              <div className="mb-2 block">
                <Label htmlFor="assunto" value="Assunto" />
              </div>
              <TextInput
                color="purple"
                id="assunto"
                type="text"
                placeholder="Descreva sobre o que se trata..."
                shadow
                {...register("titulo", {
                  required: "*O assunto é um campo obrigatório.",
                })}
              />
              {errors.titulo && (
                <p className="text-xs italic text-red-500">
                  {errors.titulo.message}
                </p>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="mensagem" value="Detalhes" />
              </div>
              <Textarea
                color="purple"
                id="mensagem"
                placeholder="Detalhe o seu problema/requisição..."
                rows={4}
                shadow
                {...register("mensagem", {
                  required: "*O problema é um campo obrigatório.",
                })}
              />
              {errors.mensagem && (
                <p className="text-xs italic text-red-500">
                  {errors.mensagem.message}
                </p>
              )}
            </div>

            <div className="block">
              <Label htmlFor="prioridade" value="Nível de Prioridade" />
            </div>
            <Select
              color="purple"
              id="prioridade"
              defaultValue="Normal"
              required
              {...register("prioridade")}
            >
              <option>Baixa</option>
              <option>Normal</option>
              <option>Alta</option>
              <option>Emergencia</option>
            </Select>

            <input
              type="hidden"
              value={session?.user.id}
              {...register("userId")}
            />

            <Button
              disabled={isSubmitting}
              isProcessing={isSubmitting}
              color="purple"
              className="w-60"
              type="submit"
            >
              Cadastrar
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
