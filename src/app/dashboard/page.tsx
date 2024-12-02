import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormDataPenduduk } from "./Form"
import { ChartPertama } from "./ChartKomponent"
import { Component2 } from "./ChartKomponent2"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Tambah data Penduduk</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Tambah data Penduduk</DialogTitle>
                <DialogDescription>
                  Lakukan penambahan penduduk di sini. Klik Simpan setelah selesai.
                </DialogDescription>
              </DialogHeader>
              <FormDataPenduduk />
              <DialogFooter>
                {/* <Button type="submit">Sipman</Button> */}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <ChartPertama/>
            <Component2/>
            <div className="rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
