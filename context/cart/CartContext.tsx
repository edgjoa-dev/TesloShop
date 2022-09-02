import { createContext } from 'react'
import { ICartProduct } from '../../interfaces';


interface contextProps{
    cart: ICartProduct[];

    //Methods
    addProductToCart: (product: ICartProduct) => void;
}


export const CartContext = createContext({} as contextProps)