import { IUser } from "../../interfaces"
import { AuthState } = from './'


type AuthActionType =
|{ type: '[Auth] - Login', payload: IUser }

export const authReducer = (state = AuthState, action:AuthActionType): AuthState => {

switch (action.type) {
case '[Auth] - Login':
return {
...state
}
default:
return state;
}
}