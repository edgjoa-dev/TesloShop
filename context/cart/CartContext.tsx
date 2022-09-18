import { createContext } from 'react'
import { ICartProduct } from '../../interfaces';
import { ShippingAddress } from './';

interface contextProps{
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?: ShippingAddress,

// methods
    addProductToCart: (product: ICartProduct) => void
    updateCartQuantity: (product: ICartProduct) => void
    removeCartProduct: (product: ICartProduct) => void
    updateAddress: (address: ShippingAddress) => void
}
export const CartContext = createContext({} as contextProps)