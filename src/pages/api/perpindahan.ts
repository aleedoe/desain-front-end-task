import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            // Create a new PerpindahanPenduduk
            const { nik, alamatTujuan, alasanPindah, statusPermohonan, catatanPetugas } = req.body;

            if (!nik || !alamatTujuan || !alasanPindah) {
                return res.status(400).json({ error: 'Required fields are missing.' });
            }

            const perpindahan = await prisma.perpindahanPenduduk.create({
                data: {
                    nik,
                    alamatTujuan,
                    alasanPindah,
                    statusPermohonan: statusPermohonan || 'Pending',
                    catatanPetugas,
                },
            });

            return res.status(201).json(perpindahan);
        } else if (req.method === 'GET') {
            const { id } = req.query;

            if (id) {
                // Get PerpindahanPenduduk by ID
                const perpindahan = await prisma.perpindahanPenduduk.findUnique({
                    where: { id: Number(id) },
                    include: { penduduk: true },
                });

                if (!perpindahan) {
                    return res.status(404).json({ error: 'Perpindahan not found.' });
                }

                return res.status(200).json(perpindahan);
            }

            // Fetch all PerpindahanPenduduk
            const perpindahanList = await prisma.perpindahanPenduduk.findMany({
                include: { penduduk: true },
            });
            return res.status(200).json(perpindahanList);
        } else if (req.method === 'PUT') {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({ error: 'ID is required for updating.' });
            }

            const updatedPerpindahan = await prisma.perpindahanPenduduk.update({
                where: { id },
                data: req.body,
            });

            return res.status(200).json(updatedPerpindahan);
        } else if (req.method === 'DELETE') {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({ error: 'ID is required for deletion.' });
            }

            await prisma.perpindahanPenduduk.delete({
                where: { id: Number(id) },
            });

            return res.status(200).json({ message: 'Perpindahan deleted successfully.' });
        } else {
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
        }
    } catch (error) {
        console.error('Error in PerpindahanPenduduk API:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
