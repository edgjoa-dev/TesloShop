import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose';

import { db } from '../../../database';
import Product from '../../../models/Product';
import { IProducts } from '../../../interfaces/products';



import { v2 as cloudinary } from 'cloudinary'
cloudinary.config( process.env.CLOUDINARY_URL ||'' );


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

    await db.connect();

    const products = await Product.find()
    .sort({ title: 'asc' })
    .lean()
    await db.disconnect();

    //TODO: actualizar las imagenes
    res.status(200).json(products)

}


const updateProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { _id='', images = [] } = req.body as IProducts;

    if( !isValidObjectId(_id) ){
        return res.status(404).json({ message: 'El Id del producto nos es válido' });
    }

    if( images.length < 2 ) {
        return res.status(400).json({ message: 'Es necesario cargar almenos 2 imágenes' })
    }

    try {

        await db.connect();
        const product = await Product.findById(_id);

        if ( !product ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe un producto con ese ID' });
        }

        // TODO: eliminar fotos en Cloudinary
        // https://res.cloudinary.com/cursos-udemy/image/upload/v1645914028/nct31gbly4kde6cncc6i.jpg
        product.images.forEach( async(image) => {
            if ( !images.includes(image) ){
                // Borrar de cloudinary
                const [ images, fileId, extension ] = image.substring( image.lastIndexOf('/') + 1 ).split('.')
                console.log({ images, fileId, extension });
                await cloudinary.uploader.destroy( 'fileId'  );
            }
        });



        await product.update( req.body );
        await db.disconnect();


        return res.status(200).json( product );

    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar la consola del servidor' });
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

