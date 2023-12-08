"use client"

import { Badge, Button, Table } from "flowbite-react"
import { useEffect, useState } from "react"
import { HiOutlineEye, HiOutlinePencilSquare } from "react-icons/hi2"
import moment from "moment"
import Loader from "../Loader"
import ViewTicketModal from "./ViewTicketModal"
import Link from "next/link"
import { useTicketContext } from "@/app/context/TicketContext"

export default function TicketTable() {
  const ticket = useTicketContext()

  const [openModal, setOpenModal] = useState(false)
  const [selectedId, setSelectedId] = useState(1)

  function handleModal() {
    setOpenModal(!openModal)
  }

  if (ticket.isLoading) {
    return <Loader loadingType="table" isLoading={ticket.isLoading} />
  }

  return (
    <>
      <div className="overflow-x-auto overflow-y-auto h-[400px] mt-4 shadow-md">
        <Table>
          <Table.Head>
            <Table.HeadCell className="p-2">Nº</Table.HeadCell>
            <Table.HeadCell className="p-2">Topico</Table.HeadCell>
            <Table.HeadCell className="p-2">Assunto</Table.HeadCell>
            <Table.HeadCell className="p-2">Usuário</Table.HeadCell>
            <Table.HeadCell className="p-2">Data</Table.HeadCell>
            <Table.HeadCell className="p-2">Status</Table.HeadCell>
            <Table.HeadCell className="p-2">Prioridade</Table.HeadCell>
            <Table.HeadCell className="p-2">
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {ticket.tickets.map((ticket, index) => {
              return (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="p-2">{ticket.id}</Table.Cell>
                  <Table.Cell className="p-2">
                    {ticket.ticketTopico.topico}
                  </Table.Cell>
                  <Table.Cell className="p-2">{ticket.titulo}</Table.Cell>
                  <Table.Cell className="p-2">{ticket.user.email}</Table.Cell>
                  <Table.Cell className="p-2">
                    {moment(ticket.createdAt).format("DD/MM/yyyy HH:mm")}
                  </Table.Cell>
                  <Table.Cell className="p-2">{ticket.status}</Table.Cell>
                  <Table.Cell className="px-2 flex items-center">
                    {(() => {
                      if (ticket.prioridade === "Baixa") {
                        return <Badge color="success">Baixa</Badge>
                      } else if (ticket.prioridade === "Normal") {
                        return <Badge color="gray">Normal</Badge>
                      } else if (ticket.prioridade === "Alta") {
                        return <Badge color="failure">Alta</Badge>
                      } else if (ticket.prioridade === "Emergencia") {
                        return <Badge color="failure">Emergência</Badge>
                      }
                    })()}
                  </Table.Cell>
                  <Table.Cell className="p-2">
                    <div className="flex items-center">
                      <Button
                        className="p-0 m-0"
                        outline
                        color="purple"
                        onClick={() => {
                          setSelectedId(ticket.id)
                          handleModal()
                        }}
                      >
                        <HiOutlineEye className="h-6 w-6" />
                      </Button>
                      <Link href={`/client/tickets/${ticket.id}`}>
                        <Button className="p-0 m-0" outline color="purple">
                          <HiOutlinePencilSquare className="h-6 w-6" />
                        </Button>
                      </Link>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </div>
      <div className="flex flex-col items-end">
        <span className="mx-2 my-2">
          Exibindo {ticket.tickets.length} de {ticket.tickets.length} itens
        </span>
      </div>

      <ViewTicketModal
        ticketId={selectedId}
        handleModal={handleModal}
        openModal={openModal}
      />
    </>
  )
}
