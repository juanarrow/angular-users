import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthState, authAdapter } from './auth.reducer';

// Lookup the 'Login' feature state managed by NgRx
export const selectAuthState =
  createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

const { selectAll, selectEntities } = authAdapter.getSelectors();

export const selectAuthLogged = createSelector(
  selectAuthState,
  (state: AuthState) => state.logged
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => {
    var users = selectAll(state);
    if(users.length)
      return users[0];
    else
      return null;
  }
);

export const selectAuthEntities = createSelector(
  selectAuthState,
  (state: AuthState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectAuthState,
  (state: AuthState) => state.selectedId
);

export const selectEntity = createSelector(
  selectAuthEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

