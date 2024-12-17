"use client"

import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from '@/components/ui/button'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { SquarePen, Trash2 } from 'lucide-react'

interface Penduduk {
    nik: string;
    nama: string;
    tempatLahir: string;
    tanggalLahir: string;
    jenisKelamin: string;
    alamat?: string;
    statusPekerjaan?: string;
    statusPernikahan?: string;
    agama: string;
    nomorTelepon?: string;
    pendidikanTerakhir?: string;
    tanggalRegistrasi: string;
    statusVerifikasi: string;
    catatanPetugas?: string;
}


const MainTable = () => {

    const [pendudukList, setPendudukList] = useState<Penduduk[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPendudukData = async () => {
            try {
                const response = await axios.get('/api/penduduk'); // Sesuaikan dengan endpoint API Anda
                setPendudukList(response.data);
            } catch (err) {
                setError('Failed to fetch data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPendudukData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Button variant="outline">Tambah Penduduk</Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>Daftar Penduduk Terdaftar</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">No</TableHead>
                            <TableHead className="w-[120px]">NIK</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Tempat Lahir</TableHead>
                            <TableHead>Tanggal Lahir</TableHead>
                            <TableHead>Jenis Kelamin</TableHead>
                            <TableHead>Alamat</TableHead>
                            <TableHead>Agama</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pendudukList.map((penduduk, index) => (
                            <TableRow key={penduduk.nik}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell className="font-medium">{penduduk.nik}</TableCell>
                                <TableCell>{penduduk.nama}</TableCell>
                                <TableCell>{penduduk.tempatLahir}</TableCell>
                                <TableCell>{new Date(penduduk.tanggalLahir).toLocaleDateString()}</TableCell>
                                <TableCell>{penduduk.jenisKelamin}</TableCell>
                                <TableCell>{penduduk.alamat || "-"}</TableCell>
                                <TableCell>{penduduk.agama}</TableCell>
                                <TableCell className=''>
                                    <div className='flex flex-row'>
                                        <Button variant="ghost">
                                            <Trash2 className="text-red-500" />
                                        </Button>
                                        <Button variant="ghost">
                                            <SquarePen className='text-blue-500' />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

            </CardFooter>
        </Card>
    )
}

export default MainTable