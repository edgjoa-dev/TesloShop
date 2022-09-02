import { FC, useReducer } from 'react';
import { ICartProduct } from '../../interfaces';
import {  CartContext, cartReducer } from './';

type Props = {
    children: React.ReactNode;

}
export interface CartState {
    cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
    cart: []
}

export const CartProvider:FC<Props> = ({ children }) => {

const [state, dispatch] = useReducer( cartReducer, CART_INITIAL_STATE );

    const addProductToCart = ( product: ICartProduct ) => {

    }

return(
<CartContext.Provider value={{
    ...state,
    //methods
    addProductToCart,
}} >
    { children }
</CartContext.Provider>
)
}