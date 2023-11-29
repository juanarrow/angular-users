import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import * as LoginActions from './auth.actions';
import { AuthService } from '../../services/api/auth.service';
import { JwtService } from '../../services/jwt.service';

@Injectable()
export class AuthEffects {
  static AUTH_FEATURE_KEY(AUTH_FEATURE_KEY: any, AuthReducer: any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
    throw new Error('Method not implemented.');
  }
  static AuthReducer(AUTH_FEATURE_KEY: any, AuthReducer: any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
    throw new Error('Method not implemented.');
  }

  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.init),
      switchMap((init) =>this.jwtService.loadToken().pipe(
        switchMap(() => this.authService.me().pipe(
          switchMap((response) => { 
            this.router.navigate([init.redirectUrl]);
            return of(LoginActions.loginSuccess({user:response, redirectUrl:init.redirectUrl}))}),
          catchError(error => [LoginActions.loginFailure({ error: error })]))),
        catchError(error => [LoginActions.loginFailure({ error: error })]))),
      catchError(error => [LoginActions.loginFailure({ error: error })])));


  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.login),
      switchMap((authProps) => this.authService.login(authProps.auth).pipe(
        switchMap((loginResponse)=>this.jwtService.saveToken(loginResponse.jwt).pipe(
          switchMap((_) => this.authService.me().pipe(
            switchMap((meResponse) => { 
              this.router.navigate([authProps.redirectUrl]);
              return of(LoginActions.loginSuccess({user:meResponse, redirectUrl:authProps.redirectUrl}))}),
            catchError(error => [LoginActions.loginFailure({ error: error })]))),
          catchError(error => [LoginActions.loginFailure({ error: error })]))),
        catchError(error => [LoginActions.loginFailure({ error: error })]))),
      catchError((error) => [LoginActions.loginFailure({ error: error })])
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.register),
      switchMap((registerProps) => this.authService.register(registerProps.userInfo).pipe(
        switchMap((registerResponse)=>this.jwtService.saveToken(registerResponse.jwt).pipe(
          switchMap((_)=>this.authService.postRegister({
            name:registerProps.userInfo.name, 
            surname: registerProps.userInfo.surname, 
            user_id:registerResponse.user.id}).pipe(
            switchMap((_) => this.authService.me().pipe(
              switchMap((meResponse) => { 
                this.router.navigate([registerProps.redirectUrl]);
                return of(LoginActions.loginSuccess({user:meResponse, redirectUrl:registerProps.redirectUrl}))}),
              catchError(error => [LoginActions.loginFailure({ error: error })]))),
            catchError(error => [LoginActions.loginFailure({ error: error })]))),
          catchError(error => [LoginActions.loginFailure({ error: error })]))),
        catchError(error => [LoginActions.loginFailure({ error: error })]))),
      catchError((error) => [LoginActions.loginFailure({ error: error })])
    )
  );

  
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.logout),
      switchMap((props) => {
        return this.jwtService.destroyToken().pipe(
          switchMap((_) => {
            this.router.navigate([props.redirectUrl]);
            return of(LoginActions.logoutSuccess());
          }),
          catchError(error => [LoginActions.loginFailure({ error: error })]))
      })));

  

  constructor(
    private router: Router,
    private jwtService:JwtService,
    private authService: AuthService
  ) {}
}
