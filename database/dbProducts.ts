import { db } from "."
import { Product } from "../models"
import { IProducts } from "../interfaces";



export const getProductBySlug = async( slug: string): Promise<IProducts | null> => {

    await db.connect()
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect()


    if(!product) {
        return null;
    }


    //TODO: Procesamiento de imagenes al subir al server

    product.images = product.images.map( image=> {
        return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
    })


    return JSON.parse(JSON.stringify(product));

}
interface ProductSlug {
    slug: string;
}

export const getAllProductsBySlug = async() => {

    await db.connect()
    const slug = await Product.find().select('slug -_id').lean();
    await db.disconnect()

    return slug;

}
export const getProductsByTerm = async( term:string ): Promise<IProducts[]> => {

    term = term.toString().toLowerCase();

    await db.connect()
    const products = await Product.find({
        $text: { $search: term }
    })
    .select('title images price inStock -_id')
    .lean();
    await db.disconnect()

    const updatedProducts = products.map( product => {
        product.images = product.images.map( image=> {
            return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
        });
        return product;
    } )


    return updatedProducts;

}

export const getAllProducts = async(  ): Promise<IProducts[]> => {

    await db.connect()
    const products = await Product.find().lean();
    await db.disconnect()

    const updatedProducts = products.map( product => {
        product.images = product.images.map( image=> {
            return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
        });
        return product;
    } );


    return JSON.parse(JSON.stringify(updatedProducts));

}