import {  FC, useReducer} from 'react';
import { UiContext, uiReducer } from './';

export interface NameState {
    isOpen: boolean;
}

const UI_INITIAL_STATE: NameState = {
    isOpen: false,
}

type Props = {
    children: React.ReactNode;
}

export const UiProvider:FC<Props> = ({ children }) => {

const [state, dispatch] = useReducer( uiReducer, UI_INITIAL_STATE );

const togggleSideMenu = ()=> {
    dispatch({ type: '[UI] - ToggleMenu' })
}

return(
<UiContext.Provider value={{
    ...state,

    //method
    togggleSideMenu,
}} >
    { children }
</UiContext.Provider>
)
}