import { createContext } from 'react'
import { ICartProduct } from '../../interfaces';


interface contextProps{
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress: {
        firstName: string;
        lastName:  string;
        address:   string;
        address2?: string;
        zip:       string;
        city:      string;
        country:   string;
        phone:     string;
    }

// methods
    addProductToCart: (product: ICartProduct) => void
    updateCartQuantity: (product: ICartProduct) => void
    removeCartProduct: (product: ICartProduct) => void
}


export const CartContext = createContext({} as contextProps)