import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { CustomTranslateService } from './core/services/custom-translate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{

  lang:string = "es";
  constructor(
    public translate:CustomTranslateService,
    private auth:AuthService,
    private router:Router
  ) {
    this.auth.isLogged$.subscribe(logged=>{
      if(logged)
        this.router.navigate(['/home']);
    });
    this.translate.use(this.lang);
  }
 
  onLang(){
    if(this.lang=='es')
      this.lang='en';
    else
      this.lang='es';
    
    this.translate.use(this.lang);


    return false;    
  
  }
}
