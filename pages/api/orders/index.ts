import type { NextApiRequest, NextApiResponse } from 'next'
import { IOrder } from '../../../interfaces';
import { getSession } from 'next-auth/react';
import { Product } from '../../../models';
import { db } from '../../../database';


type Data = {
    message: string
}

    export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

        switch (req.method) {
            case 'POST':
                return createOrder( req, res );

            default:
                return res.status(404).json({ message: 'Invalid method' });
        }

    }

    const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

        const { orderItems, total } = req.body as IOrder;

        //Verificar la session de usuario
        const session = await getSession({ req })
        if( !session ){
            return res.status(401).json({ message: 'Debe de estar autenticado para hacer está acción' })
        }

        //verificar precios de producto contra DB
        const productsIds = orderItems.map( product => product._id )
        await db.connect();

        const dbProducts = await Product.find({ _id: { $in: productsIds } })

        try {
            const subTotal = orderItems.reduce((prev, current) => {

                const currentPrice = dbProducts.find( prod => prod._id === current._id)?.price
                if(!currentPrice){
                    throw new Error('Validar montos de productos, ya que no son correctos')
                }

                return (currentPrice * current.quantity) + prev
            }, 0);
        } catch (error) {

        }

        res.status(200).json(body);
}
