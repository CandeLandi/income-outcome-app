import { User } from '../models/user.model';
import { setUser, unSetUser } from './auth.actions';
import { createReducer, on } from '@ngrx/store';

export interface State {
    user: User | null;
}

export const initialState: State = {
   user: null,
}

const _authReducer = createReducer(initialState,

    on(setUser, ( state , {user}) => ({ ...state, user: {...user}})),
    on(unSetUser, ( state  => ({ ...state, user: null }))),

);

export function authReducer(state: any, action: any) {
    return _authReducer(state, action);
}
