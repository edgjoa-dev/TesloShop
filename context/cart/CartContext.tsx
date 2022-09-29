import { createContext } from 'react'
import { ICartProduct, ShippingAddress } from '../../interfaces';

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

//Orders
createOrder: () => Promise<void>
}
export const CartContext = createContext({} as contextProps)