import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-8 text-center text-2xl font-bold">Show do Milhão</h1>

        <div className="space-y-4">
          <Link href="/login" className="block w-full">
            <Button className="w-full bg-[#2e3257] hover:bg-[#1e2147]">Login</Button>
          </Link>

          <Link href="/cadastro" className="block w-full">
            <Button className="w-full bg-[#2e3257] hover:bg-[#1e2147]">Cadastro</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
