"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import CreateTicketModal from "@/components/Tickets/CreateTicketModal"
import { useState } from "react"
import { Button } from "flowbite-react"
import { HiOutlinePencil } from "react-icons/hi2"
import TicketTable from "@/components/Tickets/TicketTable"
import Breadcrumb from "@/components/Breadcrumb"

export default function Tickets() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login")
    },
  })

  const [openModal, setOpenModal] = useState(false)

  function handleModal() {
    setOpenModal(!openModal)
  }

  const breadcrumbPaths = [{ name: "Tickets", url: "" }]

  return (
    status === "authenticated" && (
      <main className="m-4">
        <Breadcrumb paths={breadcrumbPaths} />
        <section>
          <div className="flex items-center justify-between">
            <h1>Meus Tickets</h1>
            <Button color="purple" onClick={handleModal}>
              <HiOutlinePencil className="w-6 h-6 mr-1" /> Abrir Ticket
            </Button>
          </div>
          <TicketTable />
        </section>

        <section>
          <CreateTicketModal handleModal={handleModal} openModal={openModal} />
        </section>
      </main>
    )
  )
}
