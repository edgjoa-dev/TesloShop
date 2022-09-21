import { db } from '.';
import User from '../models/User';
import bcrypt from 'bcryptjs';



export const checkEmailPassword = async( email: string, password: string ) => {

    await db.connect()
    const user = await User.findOne({ email })
    await db.disconnect()

    if (!user) {
        return null;
    }

    if (!bcrypt.compareSync(password, user.password!)) {
        return null;
    }


    const { _id, name, role } = user

    return {
        _id,
        name,
        role,
    }

}