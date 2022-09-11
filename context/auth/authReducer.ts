import { AuthState } = from './'


type AuthActionType =
|{ type: '[Name] - ActionName' }

export const authReducer = (state = AuthState, action:AuthActionType): NameState => {

switch (action.type) {
case '[Name] - ActionName':
return {
...state
}
default:
return state;
}
}