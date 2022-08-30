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

    return products;

}

export const getAllProducts = async(  ): Promise<IProducts[]> => {

    await db.connect()
    const products = await Product.find().lean();
    await db.disconnect()

    return JSON.parse(JSON.stringify(products));

}