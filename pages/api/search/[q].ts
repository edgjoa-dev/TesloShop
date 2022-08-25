import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Product } from '../../../models'
import { IProducts } from '../../../interfaces/';

type Data =
    | {message: string}
    | IProducts[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return searchProducts(req, res)


        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }
}

const searchProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    let {q = ''} = req.query

    if(q.length === 0 ){
        res.status(400).json({
            message: 'Debe especificar el query de búsqueda.'
        });
    }
    q = q.toString().toLowerCase();

    await db.connect()
    const products = await Product.find({
        $text: {$search: q}
    }).lean();

    await db.disconnect()


    return res.status(200).json(products)
}
