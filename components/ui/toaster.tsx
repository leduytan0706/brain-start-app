"use client"

import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      richColors // sử dụng màu tùy biến đẹp
      closeButton
    />
  )
}
