import { createContext } from 'react'
import { IUser } from '../../interfaces';


interface contextProps{
    isLoggedIn: boolean;
    user?: IUser;
}


export const AuthContext = createContext({} as contextProps)