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

export const isValidToken = ( token: string ):Promise<string> => {

    if(!process.env.JWT_SECRET_SEED){
        throw new Error ('No se encontro api secret key de JWT - Válidar variables de entorno')
    }

    if( token.length <= 10 ){
        return Promise.reject('JWT no es válido')
    }

    return new Promise(( resolve, reject ) => {

        try {
            jwt.verify(
                //token
                token,
                //SecretKey
                process.env.JWT_SECRET_SEED || '',
                //Option
                ( err, payload ) => {
                    if (err) return reject('jwt no válido');

                    const {_id} = payload as {_id: string};
                    resolve(_id)
                }
            )
        } catch (error) {
            console.log(error)
            reject('jwt no es válido')
        }
    })
}
