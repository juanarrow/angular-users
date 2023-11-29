import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './core/services/api/auth.service';
import { Router } from '@angular/router';
import { CustomTranslateService } from './core/services/custom-translate.service';
import { Subscription } from 'rxjs';
import { User } from './core/interfaces/user';
import { AuthFacade } from './core/+state/auth/auth.facade';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{

  lang:string = "es";
  user:User|undefined = undefined;
  
  constructor(
    public translate:CustomTranslateService,
    public auth:AuthFacade,
    private router:Router
  ) {
    this.auth.init();
    this.translate.use(this.lang);
  }
 
  onLang(lang:string){
    this.lang = lang;
    this.translate.use(this.lang);
    return false;    
  }
  onSignOut(){
    this.auth.logout('/login');
  }
  
}
