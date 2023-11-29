import { createAction, props } from '@ngrx/store';
import { UserCredentials } from '../../interfaces/user-credentials';
import { User } from '../../interfaces/user';
import { UserRegisterInfo } from '../../interfaces/user-register-info';

export const init = createAction('[Auth Page] Init',
  props<{redirectUrl: string}>());

export const login = createAction('[Auth Page] Login',
  props<{auth: UserCredentials, redirectUrl: string}>()
);

export const register = createAction('[Auth Page] Register',
  props<{userInfo: UserRegisterInfo, redirectUrl: string}>()
);

export const loginSuccess = createAction(
  '[Auth API] Login Success',
  props<{user: User | null, redirectUrl:string}>()
);

export const loginFailure = createAction(
  '[Auth API] Login Failure',
  props<{error: any}>()
);

export const logout = createAction('[Auth Page] Logout',
  props<{redirectUrl: string}>()
);


export const logoutSuccess = createAction('[Auth Page] Logout Success');
