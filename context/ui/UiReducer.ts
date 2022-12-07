import { UiState } from './';


type UiActionType =
   | { type: '[UI] - ToggleMenu' }


   const uiReducer = ( state: UiState, action: UiActionType ): UiState => {

   switch (action.type) {
      case '[UI] - ToggleMenu':
         return {
            ...state,
            isMenuOpen: !state.isMenuOpen
      }

      default:
         return state;
   }

}

export default uiReducer