import { FC, useReducer, useEffect } from 'react';
import Cookie from 'js-cookie'
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

    useEffect( () => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts})
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: []})
        }
    },[]);

    useEffect(()=>{
        if(state.cart.length > 0) Cookie.set( 'cart', JSON.stringify(state.cart) );
    },[state.cart])

    useEffect(()=>{

        const numberOfItems = state.cart.reduce((prev, current) =>  current.quantity + prev , 0 );
        const subTotal = state.cart.reduce((prev, current) =>  (current.price * current.quantity) + prev, 0);
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);


        const orderSumary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
        }
        console.log({orderSumary})
    },[state.cart])


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

const updateCartQuantity = ( product: ICartProduct ) => {
    dispatch({ type: '[Cart] - Change cart quantity', payload: product })
}

const removeCartProduct = ( product: ICartProduct ) => {
    dispatch({ type: '[Cart] - Remove product in cart', payload: product })
}

return(
<CartContext.Provider value={{
    ...state,

    //methods
    addProductToCart,
    updateCartQuantity,
    removeCartProduct,
}} >
    { children }
</CartContext.Provider>
)
}