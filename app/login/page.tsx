"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InboxIcon as EnvelopeIcon, LockOpenIcon as LockClosedIcon } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica de login
    console.log("Login:", { email, senha })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-xl font-bold">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <EnvelopeIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="email"
              placeholder="Email"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <LockClosedIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="password"
              placeholder="Senha"
              className="pl-10"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-[#2e3257] hover:bg-[#1e2147]">
            Entrar
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:underline">
            Voltar para o início
          </Link>
        </div>
      </div>
    </main>
  )
}
