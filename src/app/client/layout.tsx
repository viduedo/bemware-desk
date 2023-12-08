"use client"

import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import Footer from "@/components/Footer"
import { useState } from "react"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  function handleCollapse() {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="flex flex-col ">
      <Navbar handleCollapse={handleCollapse} />
      <div className="flex h-[calc(100vh_-_70px)] overflow-hidden">
        <Sidebar isCollapsed={isCollapsed} />
        <div className="flex flex-col w-full overflow-auto">
          {children}
          <Footer />
        </div>
      </div>
    </div>
  )
}
