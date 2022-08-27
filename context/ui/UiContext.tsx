import { createContext } from 'react'


interface contextProps{
    [key:string]: any

    //method
    togggleSideMenu: () => void;
}


export const UiContext = createContext({} as contextProps)