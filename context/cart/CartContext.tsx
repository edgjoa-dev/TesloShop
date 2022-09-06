import { createContext } from 'react'
import { ICartProduct } from '../../interfaces';


interface contextProps{
    cart: ICartProduct[];
    addProductToCart: (product: ICartProduct) => void
    updateCartQuantity: (product: ICartProduct) => void
}


export const CartContext = createContext({} as contextProps)