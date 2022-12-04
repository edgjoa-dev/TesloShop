import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProducts } from '../../../interfaces/products';
import Product from '../../../models/Product';
import { isValidObjectId } from 'mongoose';

type Data =
| { message: string }
| IProducts[]
| IProducts

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProducts(req, res);

            case 'PUT':
            return updateProducts(req, res);

            case 'POST':
            return crateProduct(req, res);

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


const updateProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { _id='', images = [] } = req.body;

    if( !isValidObjectId(_id) ){
        return res.status(404).json({ message: 'El Id del producto nos es válido' });
    }

    if( images.length < 2 ) {
        return res.status(400).json({ message: 'Es necesario cargar almenos 2 imagenes' })
    }

    try {

        await db.connect();
        const product = await Product.findById(_id);
        if( !product ){
            await db.disconnect();
            return res.status(400).json({ message: 'El producto nos es válido' });
        }

        //TODO: eliminar fotos en cloudinary

        await product.update(req.body)
        await db.disconnect();

        return res.status(200).json( product )

    } catch (error) {
        console.log(error);
        await db.disconnect();

        return res.status(400).json({ message: 'Favor de validar los logs de la consola' });

    }
}

const  crateProduct = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { images = [] } = req.body as IProducts;

    if( images.length < 2 ) {
        return res.status(400).json({ message: 'Es necesario cargar almenos 2 imagenes' })
    }

    try {

        await db.connect();
        const productInDB = await Product.findOne({ slug: req.body.slug});
        if( productInDB ) {
            await db.disconnect();
            return res.status(400).json({ message: 'Ya existe un producto con ese slug' })
        }

        const product = new Product(req.body);
        await product.save();
        await db.disconnect();

        res.status(201).json(product)

    } catch (error) {
        console.log(error);
        await db.disconnect();

        return res.status(400).json({ message: 'Favor de validar los logs de la consola' });
    }
}

