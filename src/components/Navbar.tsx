"use client"

import { Avatar, Dropdown, Navbar as FbNavbar, Button } from "flowbite-react"

import {
  HiOutlineSearch,
  HiOutlineLogout,
  HiOutlinePencilAlt,
} from "react-icons/hi"

import { HiBars3CenterLeft } from "react-icons/hi2"

import { signOut, useSession } from "next-auth/react"

interface NavbarProps {
  handleCollapse: () => void
}

export default function Navbar({ handleCollapse }: NavbarProps) {
  return (
    <FbNavbar fluid className="bg-gray-50 py-4 px-3 h-[70px]">
      <div className="flex items-center justify-start">
        <Button
          onClick={handleCollapse}
          className="bg-transparent enabled:hover:bg-gray-100 text-gray-500 enabled:hover:text-gray-900 border-0 rounded-sm focus:ring-0 w-9 h-9"
        >
          <HiBars3CenterLeft className="h-6 w-6" />
        </Button>
        <FbNavbar.Brand href="#" className="ml-4">
          <img
            src="/logotipo2.png"
            className="mr-3 h-6 sm:h-9"
            alt="WareDesk Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            WareDesk
          </span>
        </FbNavbar.Brand>
      </div>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Administrador</span>
            <span className="block truncate text-sm font-medium">
              admin@bemware.com.br
            </span>
          </Dropdown.Header>
          <Dropdown.Item icon={HiOutlinePencilAlt}>Editar Perfil</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() => signOut({ callbackUrl: process.env.NEXTAUTH_URL })}
            icon={HiOutlineLogout}
          >
            Sair
          </Dropdown.Item>
        </Dropdown>
      </div>
    </FbNavbar>
  )
}
