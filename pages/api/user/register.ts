import type { NextApiRequest, NextApiResponse } from 'next'

import bcrypt  from 'bcryptjs';

import { db } from '../../../database';
import { User } from '../../../models';
import { jwt, validations } from '../../../utils';

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

            return registerUser(req, res)

        default:
            res.status(400).json(
                { message: 'Bad Request' }
            )
    }

}

const registerUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email='', password='', name ='' } = req.body as { email: string, password: string, name: string };



    if( password.length < 8){
        return res.status(400).json({message: 'La contraseña debe ser de almenos 8 caracteres'})
    }
    if( name.length < 3){
        return res.status(400).json({message: 'Nombre no válido, debe ser de almenos 3 caracteres'})
    }
    if( !validations.isValidEmail(email)){
        return res.status(400).json({message: 'El correo no es válido'})
    }

    await db.connect();
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({message: 'Correo no válido, ya existe en database'})
    }


    const newUser = new User({
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password),
        role: 'client',
        name,
    })

    try {
        await newUser.save({ validateBeforeSave: true });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Revise logs del servidor para válidar error'
        })
    }

    const { id, role } = newUser;

    const token = jwt.singToken( id, email )

    return res.status(200).json({
        token,
        user: {
            email, role, name
        },
    })

}