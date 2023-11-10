import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

export type JwtToken = string;
@Injectable({providedIn: 'root'})
export class JwtService {

  token: string = "";

  constructor() {
  }

  loadToken(): Observable<JwtToken> {
    return new Observable<JwtToken>(observer => {
      Preferences.get({key:'jwtToken'}).then((ret:any) => {
        if (ret['value']) {
          this.token = JSON.parse(ret.value);
          if(this.token == '' || this.token == null)
            observer.next('');
          else 
            observer.next(this.token);
          observer.complete();
        }
        else {
          observer.next('');
          observer.complete();
        }
      }).catch((error:any) => observer.next(error));
    });
  }

  getToken(): JwtToken {
    return this.token;
  }

  saveToken(token: JwtToken):Observable<JwtToken> {
    return new Observable<JwtToken>(observer => {
      Preferences.set({
        key: 'jwtToken',
        value: JSON.stringify(token)
      }).then((_) => {
        this.token = token;
        observer.next(this.token);
        observer.complete();
      }).catch((error:any) => {
        observer.error(error);
      });
    });
  }

  destroyToken(): Observable<JwtToken> {
    //this.token = null;
    this.token = "";
    return this.saveToken(this.token);
  }
}
