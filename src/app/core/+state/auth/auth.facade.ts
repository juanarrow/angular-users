import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as LoginActions from './auth.actions';
import * as LoginSelectors from './auth.selectors';
import { UserCredentials } from '../../interfaces/user-credentials';
import { UserRegisterInfo } from '../../interfaces/user-register-info';

@Injectable()
export class AuthFacade {

  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  logged$ = this.store.pipe(select(LoginSelectors.selectAuthLogged));
  user$ = this.store.pipe(select(LoginSelectors.selectUser));
  error$ = this.store.pipe(select(LoginSelectors.selectAuthError));


  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init(redirectUrl:string='/home') {
    this.store.dispatch(LoginActions.init({redirectUrl:redirectUrl}));
  }

  login(auth: UserCredentials, redirectUrl:string = '/home') {
    this.store.dispatch(LoginActions.login({auth:auth, redirectUrl:redirectUrl}));
  }

  register(info: UserRegisterInfo, redirectUrl:string = '/home'){
    this.store.dispatch(LoginActions.register({userInfo:info, redirectUrl:redirectUrl}));
  }

  logout(redirectUrl: string) {
    this.store.dispatch(LoginActions.logout({redirectUrl:redirectUrl}));
  }
}
