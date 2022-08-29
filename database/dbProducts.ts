import { db } from "."
import { Product } from "../models"



export const getProductBySlug = async( slug: string) => {

    await db.connect()
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect()


}