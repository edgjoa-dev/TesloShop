import type { NextApiRequest, NextApiResponse } from 'next'

import bcrypt  from 'bcryptjs';

import { db } from '../../../database';
import { User } from '../../../models';
import { jwt } from '../../../utils';

type Data =
|{ message: string}
|{
    token: string
    user: {
        email: string;
        name: string;
        role: string;
    }
}


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':

            return loginUser(req, res)

        default:
            res.status(400).json(
                { message: 'Bad Request' }
            )
    }

}

const loginUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email='', password='' } = req.body;

    await db.connect();
    const user = await User.findOne({email});
    await db.disconnect();

    if(!user) {
        return res.status(404).json({message: 'Usuario y/o contraseña no son válidos - email' } )
    }
    if(!bcrypt.compareSync( password, user.password! )) {
        return res.status(404).json({message: 'Usuario y/o contraseña no son válidos - password' } )
    }

    const { role, name, id } = user;

    const token = jwt.singToken( id, email )

    return res.status(200).json({
        token,
        user: {
            email, role, name
        },
    })

}