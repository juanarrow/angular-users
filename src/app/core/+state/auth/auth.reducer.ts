import { createReducer, on, Action } from '@ngrx/store';

import * as LoginActions from './auth.actions';
import { User } from '../../interfaces/user';


export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  logged: boolean; // has the Login list been loaded
  error?: any | null; // last known error (if any)
  user?:User | null;
}

export const initialAuthState: AuthState = {logged: false, user: null, error: null};

const reducer = createReducer(
  initialAuthState,
  on(LoginActions.login, (state) => ({ ...state, logged: false, error: null, user: null})),
  on(LoginActions.loginSuccess, (state, { user }) => (user?{ ...state, user:user, logged: true }:{ ...state, logged: true })),
  on(LoginActions.loginFailure, (state, { error }) => ({ ...state, error })),
  on(LoginActions.logout, (state) => ({...state})),
  on(LoginActions.logoutSuccess, (state) => ({ ...state, user:null, logged: false })));

export function AuthReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
