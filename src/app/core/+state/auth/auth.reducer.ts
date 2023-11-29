import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as LoginActions from './auth.actions';
import { User } from '../../interfaces/user';


export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState extends EntityState<User> {
  selectedId?: string | number; // which Login record has been selected
  logged: boolean; // has the Login list been loaded
  error?: any | null; // last known error (if any)
  user?:User | null;
}

export interface LoginPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

/*export const loginAdapter: EntityAdapter<User> =
  createEntityAdapter<User>();*/

export const authAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user?.id || 0,
});

export const initialAuthState: AuthState = authAdapter.getInitialState({
  // set initial required properties
  logged: false,
});

const reducer = createReducer(
  initialAuthState,
  on(LoginActions.login, (state) => ({ ...state, loaded: false, error: null, user: null})),
  on(LoginActions.loginSuccess, (state, { user }) => (user?authAdapter.setOne(user, { ...state, user:user, logged: true }):{ ...state, logged: true })),
  on(LoginActions.loginFailure, (state, { error }) => ({ ...state, error })),
  on(LoginActions.logout, (state) => (authAdapter.removeAll(state))),
  on(LoginActions.logoutSuccess, (state) => ({ ...state, user:null, logged: false })));

export function AuthReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
