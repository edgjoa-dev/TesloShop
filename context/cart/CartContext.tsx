import { createContext } from 'react'
import { ICartProduct } from '../../interfaces';


interface contextProps{
    cart: ICartProduct[];
}


export const CartContext = createContext({} as contextProps)