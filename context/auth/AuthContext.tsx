import { createContext } from 'react'
import { IUser } from '../../interfaces';


interface contextProps{
    isLoggedIn: boolean;
    user?: IUser;

    loginUser: (email: string, password: string) => Promise<boolean>
}


export const AuthContext = createContext({} as contextProps)