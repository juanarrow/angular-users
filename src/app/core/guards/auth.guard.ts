import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/api/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('login') protected loginUrl:string,
    @Inject('afterLogin') protected afterLoginUrl:string,
    @Inject('splash') protected splashUrl:string,
    private auth:AuthService,
    private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let redirectUrl = this.afterLoginUrl;
      if(route.url.length)
        redirectUrl = route.url.reduce((p,v)=>p+v.path+'/',"/");
      return this.auth.isLogged$.pipe(map(logged=>{

        if(logged==null)
          this.router.navigate([this.splashUrl]);
        else if(!logged)
          this.router.navigate([this.loginUrl],{queryParams:{redirectUrl:redirectUrl}})
        return logged==null || logged==false?false:true;
      }));
  }
  
}
