import jwt from 'jsonwebtoken'


export const singToken = () => {

    if(!process.env.JWT_SECRET_SEED)
    throw new Error ('No se encontro api secret key de JWT - Válidar variables de entorno')
}
