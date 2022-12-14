import { isValidObjectId } from "mongoose";
import { db } from ".";
import { IOrder } from "../interfaces";
import { Order } from "../models";


export const getOrderById = async( id: string ): Promise<IOrder | null> => {

    if(!isValidObjectId){
        return null;
    }

    await db.connect();
    const order = await Order.findById(id).lean();

    if(!order){
        return null;
    }
    return JSON.parse(JSON.stringify(order));

}


export const getOrderByUserId = async( userId: string ): Promise<IOrder[]> => {

    if(!isValidObjectId(userId)) {
        return [];
    }

    await db.connect();
    const order = await Order.find({ userId }).lean();
    await db.disconnect();

    return JSON.parse(JSON.stringify(order));

}