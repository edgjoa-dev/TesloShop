import { createContext } from 'react'


interface contextProps{
    isMenuOpen: boolean;

    //method
    toggleSideMenu: () => void;
}


export const UiContext = createContext({} as contextProps)