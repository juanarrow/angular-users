import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom, map, tap } from 'rxjs';
import { UserCredentials } from '../../../interfaces/user-credentials';
import { UserRegisterInfo } from '../../../interfaces/user-register-info';
import { JwtService } from '../../jwt.service';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { StrapiArrayResponse, StrapiExtendedUser, StrapiLoginPayload, StrapiLoginResponse, StrapiMe, StrapiRegisterPayload, StrapiRegisterResponse, StrapiResponse, StrapiUser } from '../../../interfaces/strapi';
import { User } from '../../../interfaces/user';

export class StrapiAuthService extends AuthService{

  constructor(
    private apiSvc:ApiService
  ) { 
    super();
  }

  public login(credentials:UserCredentials):Observable<any>{
      const _credentials:StrapiLoginPayload = {
        identifier:credentials.username,
        password:credentials.password
      };
      return this.apiSvc.post("/auth/local", _credentials);
  }

  public register(info:UserRegisterInfo):Observable<any>{
      const _info:StrapiRegisterPayload = {
        email:info.email,
        username:info.nickname,
        password:info.password
      }
      return this.apiSvc.post("/auth/local/register", _info);
  }

  public postRegister(info:StrapiExtendedUser){
    return this.apiSvc.post("/extended-users", {data:info});
  }

  public me():Observable<User>{
    return new Observable<User>(obs=>{
      this.apiSvc.get('/users/me').subscribe({
        next:async (user:StrapiMe)=>{
          let extended_user:StrapiArrayResponse<StrapiExtendedUser> = await lastValueFrom(this.apiSvc.get(`/extended-users?filters[user_id]=${user.id}`));
          let ret:User = {
            id:user.id,
            name:extended_user.data[0].attributes.name,
            surname:extended_user.data[0].attributes.surname,
            nickname:extended_user.data[0].attributes.nickname
          }
          obs.next(ret);
          obs.complete();
        },
        error: err=>{
          obs.error(err);
        }
      });
    });
    
  }
}
