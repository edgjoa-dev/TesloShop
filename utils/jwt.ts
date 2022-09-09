import jwt from 'jsonwebtoken'


export const singToken = ( _id: string, email: string ) => {

    if(!process.env.JWT_SECRET_SEED)
    throw new Error ('No se encontro api secret key de JWT - Válidar variables de entorno')

    return jwt.sign(
        //payload
        { _id, email },
        //Seed
        process.env.JWT_SECRET_SEED,
        //options
        { expiresIn: '1h' }
    )
}
