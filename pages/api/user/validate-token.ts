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
        case 'GET':

            return checkJWT(req, res)

        default:
            res.status(400).json(
                { message: 'Bad Request' }
            )
    }

}

const checkJWT = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { token='' } = req.cookies;

    



    // res.status(200).json({
    //     token
    // } as any)

    // await db.connect();
    // await db.disconnect();

    // if(!user) {
    //     return res.status(404).json({message: 'Usuario y/o contraseña no son válidos - email' } )
    // }
    // if(!bcrypt.compareSync( password, user.password! )) {
    //     return res.status(404).json({message: 'Usuario y/o contraseña no son válidos - password' } )
    // }

    // const { role, name, id } = user;

    // const token = jwt.singToken( id, email )

    // return res.status(200).json({
    //     token,
    //     user: {
    //         email, role, name
    //     },
    // })

}