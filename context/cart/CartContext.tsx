import { createContext } from 'react'
import { ICartProduct } from '../../interfaces';


interface contextProps{
    cart: ICartProduct[];

    //methods
    addProductToCart: (product: ICartProduct) => void
}


export const CartContext = createContext({} as contextProps)