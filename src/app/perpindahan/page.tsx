"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Interface untuk tipe data user
interface User {
  id: number
  name: string
  email: string
  password: string
}

export default function Page() {
  // State untuk menyimpan data user
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Fungsi untuk mengambil data dari API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users") // Ganti URL dengan API Anda
      setUsers(response.data) // Asumsikan respons adalah array
      setLoading(false)
    } catch (err: any) {
      setError(err.message || "Failed to fetch data")
      setLoading(false)
    }
  }

  // Mengambil data saat komponen dimuat
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <Table>
              <TableCaption>A list of users.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Password</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.password || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
