import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { UserCredentials } from '../../interfaces/user-credentials';
import { UserRegisterInfo } from '../../interfaces/user-register-info';
import { JwtService } from '../jwt.service';
import { ApiService } from './api.service';
import { User } from '../../interfaces/user';



@Injectable({
  providedIn: 'root'
})
export abstract class AuthService {

  protected _logged = new BehaviorSubject<boolean|null>(null);
  public isLogged$ = this._logged.asObservable();
  protected _user = new BehaviorSubject<User|null>(null);
  public user$ = this._user.asObservable();
  
  public abstract login(credentials:Object):Observable<User>;

  public abstract register(info:Object):Observable<User>;

  public abstract logout():Observable<void>;

  public abstract me():Observable<any>;

  public abstract getID():String|number|undefined;

  public abstract updateUser(user:User):Observable<any>;
}
