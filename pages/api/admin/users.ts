import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IUser } from '../../../interfaces';
import User from '../../../models/User';
import { isValidObjectId } from 'mongoose';

type Data =
| {message: string }
| IUser[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getUsers( req, res );

        case 'PUT':
            return updateUsers( req, res );

        default:
            res.status(400).json({ message: 'Bad request' })
        }

    }

    const getUsers = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

        db.connect()
        const user = await User.find().select('-password').lean();
        db.disconnect()

        res.status(200).json(user)
    }

    const updateUsers = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

        const { userId='', role='' } = req.body

        if( !isValidObjectId(userId) ){
            res.status(404).json({ message: 'No existe usuario con este Id'})
        }

        const validRoles = ['admin', 'super-user', 'SEO', 'client']
        if( !validRoles.includes(role) ){
            res.status(404).json({ message: 'Rol no encontrado: ' + validRoles.join(', ')})
        }

        await db.connect()
        const user = await User.findById(userId)

        if( !user ){
            await db.disconnect()
            res.status(404).json({ message: 'Usurio con id: ' + userId + ' no encontrado'})
        }

        user!.role = role;
        await user!.save();
        await db.disconnect();

        return res.status(200).json({ message: 'Usuario actualizado correctamente' })
}

