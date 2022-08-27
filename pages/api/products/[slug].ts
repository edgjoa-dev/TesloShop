import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import Product from '../../../models/Product';
import { IProducts } from '../../../interfaces';

type Data =
| {message: string}
| IProducts


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'GET':
        return getProductBySlug( req, res )

        default:
            return res.status(400 ).json({
                message: 'Method not allowed',

            })
    }


}

async function getProductBySlug(req: NextApiRequest, res: NextApiResponse<Data>) {

    await db.connect();
    const { slug } = req.query
    const product = await  Product.findOne({slug}).lean();
    await db.disconnect();
        if(!product){
            return res.status(404).json({
                message: 'Producto no encontrado',
            })

        }


    return res.status(200).json(product);


}
