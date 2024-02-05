import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './core/services/api/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomTranslateService } from './core/services/custom-translate.service';
import { Subscription, delay, of, tap } from 'rxjs';
import { User } from './core/interfaces/user';
import { IonMenu } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{

  lang:string = "es";
  constructor(
    public translate:CustomTranslateService,
    public auth:AuthService,
    private router:Router,
    public route:ActivatedRoute
  ) {
    this.translate.use(this.lang);
  }
 
  onLang(lang:string){

    this.lang = lang;
    this.translate.use(this.lang);


    return false;    
  
  }

  close(menu:IonMenu){
    of('').pipe(delay(500),tap(_=>menu.close())).subscribe();
  }
  
  onSignOut(menu:IonMenu){
    this.auth.logout().subscribe(async _=>{
      await this.router.navigate(['/login']);
      menu.close();
    });
  }

  onProfile(){
    this.router.navigate(['profile']);
  }

  routeInclude(path:string):boolean{
    return this.router.url.includes(path);
  }
}
