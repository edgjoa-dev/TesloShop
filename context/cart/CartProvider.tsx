import { FC, useReducer } from 'react';
import { ICartProduct } from '../../interfaces';
import {  CartContext, cartReducer } from './';

export interface CartState {
    cart: ICartProduct[];
}
type Props = {
    children: React.ReactNode;

}


const CART_INITIAL_STATE: CartState = {
    cart: [],
}

export const CartProvider:FC<Props> = ({ children }) => {

const [state, dispatch] = useReducer( cartReducer, CART_INITIAL_STATE );

const addProductToCart = ( product: ICartProduct ) => {

    const productInCart = state.cart.some(p => p._id === product._id);
    if(!productInCart) return dispatch( { type: '[Cart] - Update products in cart', payload: [ ...state.cart, product ] } )

    const productInCartButDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size);
    if(!productInCartButDifferentSize) return dispatch( { type: '[Cart] - Update products in cart', payload: [ ...state.cart, product ] } )

    //acumular
    const updatedProducts = state.cart.map( p => {
        if(p._id !== product._id) return p;
        if(p.size !== product.size) return p;

        //actualizar cantidad
        p.quantity += p.quantity
        return p;
    });
    dispatch( { type: '[Cart] - Update products in cart', payload: updatedProducts } )
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