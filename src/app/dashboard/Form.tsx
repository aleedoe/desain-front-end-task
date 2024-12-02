"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Define the form schema using Zod
const formSchema = z.object({
    nama: z.string().nonempty({ message: "Nama tidak boleh kosong." }),
    nik: z
        .string()
        .regex(/^\d{16}$/, { message: "NIK harus terdiri dari 16 digit angka." }),
    usia: z
        .number()
        .min(0, { message: "Usia tidak boleh kurang dari 0." })
        .max(120, { message: "Usia tidak boleh lebih dari 120." }),
    jenisKelamin: z.enum(["Laki-laki", "Perempuan"], {
        message: "Jenis kelamin harus dipilih.",
    }),
    pendidikan: z.string().nonempty({ message: "Pendidikan tidak boleh kosong." }),
    pekerjaan: z.string().nonempty({ message: "Pekerjaan tidak boleh kosong." }),
    alamat: z.string().nonempty({ message: "Alamat tidak boleh kosong." }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function FormDataPenduduk() {
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nama: "",
            nik: "",
            usia: 0,
            jenisKelamin: "Laki-laki",
            pendidikan: "",
            pekerjaan: "",
            alamat: "",
        },
    });

    const onSubmit = (data: FormSchemaType) => {
        console.log("Form submitted:", data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                    <FormField
                        control={form.control}
                        name="nik"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>NIK</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Masukkan NIK" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="usia"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Usia</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Masukkan usia" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                    <FormField
                        control={form.control}
                        name="pendidikan"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pendidikan</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Masukkan pendidikan terakhir"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pekerjaan"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pekerjaan</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukkan pekerjaan" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="alamat"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Alamat</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukkan alamat" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Simpan
                </Button>
            </form>
        </Form>
    );
}
