"use client";

import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import axios from "axios";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { TerimaPerpindahan, TolakPerpindhan } from "./MainActions";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


interface PerpindahanPenduduk {
    id: number;
    nik: string;
    alamatTujuan: string;
    alasanPindah: string;
    tanggalPermohonan: string;
    statusPermohonan: string;
}

const MainTable = () => {
    const [data, setData] = useState<PerpindahanPenduduk[]>([]); // Explicit typing for clarity
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/perpindahan"); // API endpoint
                setData(response.data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Gagal memuat data. Silakan coba lagi.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p className="text-center py-4">Sedang memuat data...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 py-4">{error}</p>;
    }

    return (
        <Card>
            <CardHeader>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>Daftar Perpindahan Penduduk</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">No</TableHead>
                            <TableHead>NIK</TableHead>
                            <TableHead>Alamat Tujuan</TableHead>
                            <TableHead>Alasan Pindah</TableHead>
                            <TableHead>Tanggal Permohonan</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{item.nik}</TableCell>
                                    <TableCell>{item.alamatTujuan}</TableCell>
                                    <TableCell>{item.alasanPindah}</TableCell>
                                    <TableCell>{new Date(item.tanggalPermohonan).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <div className='flex flex-row gap-2'>
                                            <TolakPerpindhan>
                                                <Button variant="destructive">
                                                    Tolak
                                                </Button>
                                            </TolakPerpindhan>
                                            <TerimaPerpindahan>
                                                <Button variant="success">
                                                    Terima
                                                </Button>
                                            </TerimaPerpindahan>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-4">
                                    Tidak ada data perpindahan penduduk.
                                </TableCell>
                            </TableRow>
                        )}
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
    );
};

export default MainTable;
