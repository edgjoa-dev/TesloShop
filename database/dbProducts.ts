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