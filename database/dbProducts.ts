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