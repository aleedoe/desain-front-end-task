import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type User = {
    id: number;
    name: string;
    email: string;
    password: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === 'POST') {
            // Destructuring request body
            const { name, email, password }: Omit<User, 'id'> = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ error: 'Name, email, and password are required.' });
            }

            // Create a new user
            const user = await prisma.user.create({
                data: { name, email, password },
            });

            return res.status(201).json(user);
        } else if (req.method === 'GET') {
            // Fetch all users
            const users = await prisma.user.findMany();
            return res.status(200).json(users);
        } else {
            // Handle unsupported HTTP methods
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
        }
    } catch (error) {
        console.error('Error in API handler:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
