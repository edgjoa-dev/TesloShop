import { createContext } from 'react';
import { ICartProduct, ShippingAddress } from '../../interfaces';


interface ContextProps {
    isLoaded: boolean;
    cart: ICartProduct[];
<<<<<<< HEAD

    //methods
    addProductToCart: (product: ICartProduct) => void
=======
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?: ShippingAddress,

    // Methods
    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeCartProduct: (product: ICartProduct) => void;
    updateAddress: (address: ShippingAddress) => void;

    // Orders
    createOrder: () => Promise<{ hasError: boolean; message: string; }>;
>>>>>>> f7ae69cd30712e90ca09dfa9a68975c191c225b9
}


export const CartContext = createContext({} as ContextProps );