"use client"

import { MdOutlineSupportAgent } from "react-icons/md"
import {
  HiOutlineChartPie,
  HiOutlinePencil,
  HiOutlineTicket,
  HiOutlineArchiveBox,
} from "react-icons/hi2"
import { Sidebar as FbSidebar } from "flowbite-react"
import { usePathname } from "next/navigation"

interface SidebarProps {
  isCollapsed: boolean
}

export default function Sidebar({ isCollapsed }: SidebarProps) {
  // Recebe o caminho da URL atual, após o nome do dominio. Ex.: /client/dashboard
  const pathname = usePathname()

  return (
    <FbSidebar collapsed={isCollapsed}>
      <FbSidebar.Items>
        <FbSidebar.ItemGroup>
          <FbSidebar.Item
            href="/client"
            icon={HiOutlineChartPie}
            active={pathname === "/client" ? true : false}
          >
            Dashboard
          </FbSidebar.Item>
        </FbSidebar.ItemGroup>
        <FbSidebar.ItemGroup>
          <FbSidebar.Collapse icon={MdOutlineSupportAgent} label="Suporte">
            <FbSidebar.Item
              href="/client/tickets/"
              icon={HiOutlineTicket}
              active={pathname === "/client/tickets" ? true : false}
            >
              Tickets
            </FbSidebar.Item>
          </FbSidebar.Collapse>
        </FbSidebar.ItemGroup>
      </FbSidebar.Items>
    </FbSidebar>
  )
}
