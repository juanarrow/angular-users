import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/api/auth.service';
import { AuthFacade } from '../+state/auth/auth.facade';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth:AuthFacade,
    private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let redirectUrl = '';
      if(route.url.length)
        redirectUrl = route.url.reduce((p,v)=>p+v.path+'/',"/");
      return this.auth.logged$.pipe(tap(logged=>{
        if(!logged)
          this.router.navigate(['/login'],{queryParams:{redirectUrl: redirectUrl}});
      }));
  }
  
}
