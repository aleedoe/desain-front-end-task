"use client"

import React from 'react'
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



// Define Zod Schema
const formSchema = z.object({
    nik: z
        .string()
        .regex(/\d{16}/, { message: "NIK harus terdiri dari 16 digit angka." }),
    nama: z.string().nonempty({ message: "Nama tidak boleh kosong." }),
    tempatLahir: z.string().nonempty({ message: "Tempat lahir tidak boleh kosong." }),
    tanggalLahir: z.string().nonempty({ message: "Tanggal lahir tidak boleh kosong." }),
    jenisKelamin: z.enum(["Laki-laki", "Perempuan"], {
        message: "Pilih jenis kelamin",
    }),
    alamat: z.string().optional(),
    statusPekerjaan: z.string().optional(),
    statusPernikahan: z.enum(["Belum Menikah", "Menikah", "Cerai"]).optional(),
    agama: z.string().nonempty({ message: "Agama tidak boleh kosong." }),
    nomorTelepon: z
        .string()
        .optional(),
    pendidikanTerakhir: z.string().optional(),
    catatanPetugas: z.string().optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

export const TambahPenduduk = ({ children }: { children: React.ReactNode }) => {
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nik: "",
            nama: "",
            tempatLahir: "",
            tanggalLahir: "",
            jenisKelamin: undefined,
            alamat: "",
            statusPekerjaan: "",
            statusPernikahan: undefined,
            agama: "",
            nomorTelepon: "",
            pendidikanTerakhir: "",
            catatanPetugas: "",
        },
    });

    const onSubmit = (data: FormSchemaType) => {
        console.log("Form submitted:", data);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] lg:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Tambah Penduduk</DialogTitle>
                    <DialogDescription>Isi data penduduk dengan lengkap dan benar.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* NIK */}
                            <FormField
                                control={form.control}
                                name="nik"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>NIK</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Masukkan NIK" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Nama */}
                            <FormField
                                control={form.control}
                                name="nama"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Masukkan nama lengkap" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Tempat Lahir */}
                            <FormField
                                control={form.control}
                                name="tempatLahir"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tempat Lahir</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Masukkan tempat lahir" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Tanggal Lahir */}
                            <FormField
                                control={form.control}
                                name="tanggalLahir"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tanggal Lahir</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Jenis Kelamin */}
                            <FormField
                                control={form.control}
                                name="jenisKelamin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Jenis Kelamin</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(value)}
                                                value={field.value}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Pilih jenis kelamin" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Pilihan</SelectLabel>
                                                        <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                                        <SelectItem value="Perempuan">Perempuan</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Agama */}
                            <FormField
                                control={form.control}
                                name="agama"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Jenis Kelamin</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(value)}
                                                value={field.value}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Pilih Agama" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Pilihan</SelectLabel>
                                                        <SelectItem value="Islam">Islam</SelectItem>
                                                        <SelectItem value="Kristen">Kristen</SelectItem>
                                                        <SelectItem value="Hindu">Hindu</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Nomor Telepon */}
                            <FormField
                                control={form.control}
                                name="nomorTelepon"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nomor Telepon</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Masukkan nomor telepon" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Pendidikan Terakhir */}
                            <FormField
                                control={form.control}
                                name="pendidikanTerakhir"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pendidikan Terakhir</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(value)}
                                                value={field.value}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Pilih Pendidikan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Pilihan</SelectLabel>
                                                        <SelectItem value="Islam">SD</SelectItem>
                                                        <SelectItem value="Kristen">SMP</SelectItem>
                                                        <SelectItem value="Hindu">SMA</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Simpan</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};


export const EditPenduduk = () => {
    return (
        <div>EditPenduduk</div>
    )
}



export const HapusPenduduk = ({ children }: { children: React.ReactNode }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
                {/* <Button variant="outline">Show Dialog</Button> */}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Yakin akan menghapus data?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Hapus</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
