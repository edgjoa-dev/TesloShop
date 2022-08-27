import type { NextApiRequest, NextApiResponse } from 'next'

import { Product } from '../../../models'
import { IProducts } from '../../../interfaces/products';
import { db, SHOP_CONSTANTS } from '../../../database';

type Data =
| { message: string }
| IProducts[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'GET':
            return getProducts( req, res )

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
}

const getProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { gender = 'all' } = req.query;

    let condition = {};

    if ( gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`) ) {
        condition = { gender };
    }

    await db.connect();
    const products = await Product.find(condition)
                                .select('title images price inStock slug gender -_id')
                                .lean();

    await db.disconnect();

    return res.status(200).json( products );

}