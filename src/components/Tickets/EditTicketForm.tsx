import { Label, TextInput, Select, Button } from "flowbite-react"
import Loader from "../Loader"
import { useForm } from "react-hook-form"
import { useTicketContext } from "@/app/context/TicketContext"

export type FormData = {
  titulo: string
  prioridade: string
  userId: number
  topicoId: number
}

interface EditTicketFormProps {
  ticketId: number
}

export default function EditTicketForm({ ticketId }: EditTicketFormProps) {
  const ticket = useTicketContext()
  ticket.setSelectedId(ticketId)

  //console.log(ticket.ticket)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    // Realizar a chamada de api POST
    await ticket.editTicket(data, ticketId)
    // Esperar 2 segundos
    //await delay()
  }

  return (
    <>
      {ticket.isLoading ? (
        <Loader loadingType="input" isLoading />
      ) : (
        <h1 className="text-3xl">Ticket #{ticketId || ""}</h1>
      )}

      <form
        className="flex w-3/4 flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between">
          <div className="mr-2">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Cadastrado por" />
            </div>
            {ticket.isLoading ? (
              <Loader loadingType="input" isLoading />
            ) : (
              <TextInput
                color="purple"
                id="name"
                type="text"
                defaultValue={ticket.ticket?.user.name! || ""}
                disabled
                shadow
              />
            )}
          </div>
          <div className="mr-2">
            <div className="mb-2 block">
              <Label htmlFor="email" value="E-mail" />
            </div>
            {ticket.isLoading ? (
              <Loader loadingType="input" isLoading />
            ) : (
              <TextInput
                color="purple"
                id="email"
                type="email"
                defaultValue={ticket.ticket?.user.email! || ""}
                disabled
                shadow
              />
            )}
          </div>
        </div>

        <div className="block">
          <Label htmlFor="topico" value="Tópico de Ajuda" />
        </div>
        {ticket.isLoading ? (
          <Loader loadingType="input" isLoading />
        ) : (
          <Select
            color="purple"
            id="topico"
            defaultValue={ticket.ticket?.topicoId}
            required
            {...register("topicoId")}
          >
            {ticket.ticketTopicos?.map((ticketTopico, index) => {
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
            <Label htmlFor="titulo" value="Assunto" />
          </div>

          {ticket.isLoading ? (
            <Loader loadingType="input" isLoading />
          ) : (
            <TextInput
              color="purple"
              id="titulo"
              type="text"
              placeholder="Descreva sobre o que se trata..."
              defaultValue={ticket.ticket?.titulo || ""}
              shadow
              {...register("titulo", {
                required: "*O assunto é um campo obrigatório.",
              })}
            />
          )}
          {errors.titulo && (
            <p className="text-xs italic text-red-500">
              {errors.titulo.message}
            </p>
          )}
        </div>

        <div className="block">
          <Label htmlFor="prioridade" value="Nível de Prioridade" />
        </div>
        {ticket.isLoading ? (
          <Loader loadingType="input" isLoading />
        ) : (
          <Select
            color="purple"
            id="prioridade"
            defaultValue={ticket.ticket?.prioridade}
            required
            {...register("prioridade")}
          >
            <option>Baixa</option>
            <option>Normal</option>
            <option>Alta</option>
            <option>Emergencia</option>
          </Select>
        )}

        <Button
          disabled={isSubmitting}
          isProcessing={isSubmitting}
          color="purple"
          className="w-60"
          type="submit"
        >
          Atualizar
        </Button>
      </form>
    </>
  )
}
