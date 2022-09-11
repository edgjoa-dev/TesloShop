import { FC, useReducer } from 'react';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';



export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

type Props = {
    children?: React.ReactNode
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

export const AuthProvider:FC<Props> = ({ children }) => {

const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );

return(
<AuthContext.Provider value={{
    ...state

    //Methods
}} >
    { children }
</AuthContext.Provider>
)
}