import { createContext } from 'react'
import { ICartProduct } from '../../interfaces';


interface contextProps{
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

// methods
    addProductToCart: (product: ICartProduct) => void
    updateCartQuantity: (product: ICartProduct) => void
    removeCartProduct: (product: ICartProduct) => void
}


export const CartContext = createContext({} as contextProps)