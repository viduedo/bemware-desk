"use client"
import { Toast } from "flowbite-react"
import { useEffect, useState } from "react"
import { HiCheck, HiX } from "react-icons/hi"
import { MdErrorOutline } from "react-icons/md"

interface NotificationProps {
  visible: boolean
  type: string
  message: string
  handleNotification: (visible: boolean, type: string, message: string) => void
}

export default function Notification({
  visible,
  type,
  message,
  handleNotification,
}: NotificationProps) {
  function handleDismiss() {
    handleNotification(false, "", "")
  }

  if (type === "success") {
    return (
      visible && (
        <Toast className="absolute top-5 right-5 bg-green-200">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{message}</div>
          <Toast.Toggle onDismiss={handleDismiss} />
        </Toast>
      )
    )
  }
  if (type === "error") {
    return (
      visible && (
        <Toast className="absolute top-5 right-5 bg-red-200">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <MdErrorOutline className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{message}</div>
          <Toast.Toggle onDismiss={handleDismiss} />
        </Toast>
      )
    )
  }
}
