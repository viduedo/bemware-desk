"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState } from "react"
import Breadcrumb from "@/components/Breadcrumb"
import EditTicketForm from "@/components/Tickets/EditTicketForm"
import Notification from "@/components/Notification"
import { Tabs } from "flowbite-react"
import { HiAnnotation, HiPaperClip } from "react-icons/hi"
import TicketMsg from "@/components/Tickets/ticketMsg/TicketMsg"
import TicketAnexo from "@/components/Tickets/ticketAnexo/TicketAnexo"
import CreateTicketMsgForm from "@/components/Tickets/ticketMsg/CreateTicketMsgForm"
import CreateTicketAnexoForm from "@/components/Tickets/ticketAnexo/CreateTicketAnexoForm"

export default function Ticket({ params }: any) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login")
    },
  })

  const ticketId = Number(params.id)
  const userId = Number(session?.user.id)

  const breadcrumbPaths = [
    { name: "Tickets", url: "/client/tickets" },
    { name: "Ticket [Edit]", url: "" },
  ]

  return (
    status === "authenticated" && (
      <main className="m-4">
        <Breadcrumb paths={breadcrumbPaths} />
        <section>
          <EditTicketForm ticketId={ticketId} />
        </section>

        <section className="mt-4 ">
          <Tabs aria-label="Tabs with icons" style="underline">
            <Tabs.Item
              className="flex flex-col"
              title="Mensagens"
              icon={HiAnnotation}
              active
            >
              <TicketMsg ticketId={ticketId} />
              <CreateTicketMsgForm userId={userId} ticketId={ticketId} />
            </Tabs.Item>
            <Tabs.Item
              className="flex flex-col"
              title="Anexos"
              icon={HiPaperClip}
            >
              <TicketAnexo />
              <CreateTicketAnexoForm />
            </Tabs.Item>
          </Tabs>
        </section>
      </main>
    )
  )
}
