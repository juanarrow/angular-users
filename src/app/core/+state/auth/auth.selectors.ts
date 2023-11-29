import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthState } from './auth.reducer';

// Lookup the 'Login' feature state managed by NgRx
export const selectAuthState =
  createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectAuthLogged = createSelector(
  selectAuthState,
  (state: AuthState) => state.logged
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

