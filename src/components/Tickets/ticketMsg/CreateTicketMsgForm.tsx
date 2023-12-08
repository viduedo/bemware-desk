import { useTicketContext } from "@/app/context/TicketContext"
import { Label, Textarea, Button } from "flowbite-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

export type FormData = {
  mensagem: string
  userId: number
  ticketId: number
}

interface CreateTicketMsgFormProps {
  userId: number
  ticketId: number
}

export default function CreateTicketMsgForm({
  userId,
  ticketId,
}: CreateTicketMsgFormProps) {
  const ticket = useTicketContext()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    console.log(data)
    // Realizar a chamada de api POST
    await ticket.addTicketMsg(data)
    // Esperar 2 segundos
  }

  return (
    <form
      className="flex max-w flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="mensagem" value="Mensagem" />
        </div>
        <Textarea
          color="purple"
          id="mensagem"
          placeholder="Digitar nova mensagem..."
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

      <input type="hidden" value={userId} {...register("userId")} />
      <input type="hidden" value={ticketId} {...register("ticketId")} />

      <Button
        disabled={isSubmitting}
        isProcessing={isSubmitting}
        color="purple"
        className="w-60"
        type="submit"
      >
        Enviar
      </Button>
    </form>
  )
}
