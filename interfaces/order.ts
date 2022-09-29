import { IUser } from './user';


export interface IOrder {
    _id : string;
    user?: IUser | string;
    oerderItems: IOrderItem[];

}


export interface IOrderItem {

    _id     : string;
    title   : string;
    size    : string;
    quantity: number;
    slug    : string;
    image   : string;
    price   : number;

}