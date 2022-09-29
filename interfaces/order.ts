import { IUser } from './user';


export interface IOrder {
    _id :            string;
    user?:           IUser | string;
    oerderItems:     IOrderItem[];
    shippingAddress: ShippingAddress;
    paymentResult?:  string;

    numberOfItems: number;
    subTotal:      number;
    tax:           number;
    total:         number;

    isPAid  : boolean;
    paidAt? : string;
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

export interface ShippingAddress {
    firstName: string;
    lastName:  string;
    address:   string;
    address2?: string;
    zip:       string;
    city:      string;
    country:   string;
    phone:     string;
}