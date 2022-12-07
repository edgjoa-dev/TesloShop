import { FC, useReducer } from 'react';
import { uiReducer } from './uiReducer';
import { UiContext } from './UiContext';
export interface UiState {
    isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
    isMenuOpen: false,
}

type Props = {
    children: React.ReactNode;
}


export const UiProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( uiReducer , UI_INITIAL_STATE );

    const toggleSideMenu = () => {
        dispatch({ type: '[UI] - ToggleMenu' });
    }


    return (
        <UiContext.Provider value={{
            ...state,

            // Methods
            toggleSideMenu,
        }}>
            { children }
        </UiContext.Provider>
    )
};