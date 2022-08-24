import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IProducts } from '../../../interfaces/products'
import { Product } from '../../../models'

type Data =
    | { message: string }
    | IProducts[]


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const newLocal = 'Bad request'
    switch (req.method) {
        case 'GET':
        return getProducts( req, res )

        default:
            return res.status(400).json({
                message: 'Bad Request'
            })
    }

}

const getProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

await db.connect()
const products = await Product.find()
                            .select('tile images price inStock slug -_id')
                            .lean();

await db.disconnect()

return res.status(200).json(products)

}
