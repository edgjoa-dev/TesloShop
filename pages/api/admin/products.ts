import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProducts } from '../../../interfaces/products';
import Product from '../../../models/Product';

type Data =
| { message: string }
| IProducts[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProducts(req, res);

            break;

        case 'PUT':
        case 'POST':

        default:
            res.status(200).json({ message: 'Example' })

    }

}

const  getProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {


    db.connect();
    const products = await Product.find()
    .sort({ title: 'asc' })
    .lean()
    db.disconnect();

    //TODO: actualizar las imagenes
    res.status(200).json(products)

}
