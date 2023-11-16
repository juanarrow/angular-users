import { Inject, Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { PaginatedUsers, User } from 'src/app/core/interfaces/user';
import { DataService } from './data.service';



export class UserNotFoundException extends Error {
  // . declare any additional properties or methods .
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(
    private dataService:DataService
  ){}

  private _users:BehaviorSubject<PaginatedUsers> = new BehaviorSubject<PaginatedUsers>({data:[], pagination:{page:0,pageCount:0, pageSize:0, total:0}});
  public users$:Observable<PaginatedUsers> = this._users.asObservable();
  public addUser(user:User):Observable<User>{
    return this.dataService.post<User>("extended-users", user).pipe(tap(_=>{
      this.getAll().subscribe();
    }))
  }

  public query(q:string):Observable<PaginatedUsers>{
    // Si coincide el tipo de datos que recibo con mi interfaz
    return this.dataService.query<any>('extended-users?populate=picture&sort=id', {}).pipe(map(response=>{
      return {
        data:response.data.map(user=>{
          return {
            id:user.id,
            name:user.name,
            surname:user.surname,
            nickname:user.nickname,
            picture:user.picture?.data?{
              id: user.picture.data.id,
              url_large: user.picture.data.attributes.formats.large?.url,
              url_small: user.picture.data.attributes.formats.small?.url,
              url_medium:user.picture.data.attributes.formats.medium?.url,
              url_thumbnail:user.picture.data.attributes.formats.thumbnail?.url,
            }:null
          };
        }),
        pagination:response.pagination
      };
    }));
  }

  public getAll():Observable<PaginatedUsers>{
    // Si coincide el tipo de datos que recibo con mi interfaz
    return this.dataService.query<any>('extended-users?populate=picture&sort=id', {}).pipe(map(response=>{
      return {
        data:response.data.map(user=>{
          return {
            id:user.id,
            name:user.name,
            surname:user.surname,
            nickname:user.nickname,
            picture:user.picture?.data?{
              id: user.picture.data.id,
              url_large: user.picture.data.attributes.formats.large.url,
              url_small: user.picture.data.attributes.formats.small.url,
              url_medium:user.picture.data.attributes.formats.medium.url,
              url_thumbnail:user.picture.data.attributes.formats.thumbnail.url,
            }:null
          };
        }),
        pagination:response.pagination
      };
    }),tap(users=>{
      this._users.next(users);
    }));
  }

  public getUser(id:number):Observable<User>{
    return this.dataService.get<any>(`extended-users/${id}?populate=picture`).pipe(map(response=>{
      return {
        id:response.id,
        name:response.name,
        surname:response.surname,
        nickname:response.nickname,
        picture:response.picture?.data?{
          id: response.picture.data.id,
          url_large: response.picture.data.attributes.formats.large.url,
          url_small: response.picture.data.attributes.formats.small.url,
          url_medium:response.picture.data.attributes.formats.medium.url,
          url_thumbnail:response.picture.data.attributes.formats.thumbnail.url,
        }:null
      };
    }));
  }

  public updateUser(user:User):Observable<User>{
    return this.dataService.put<any>(`extended-users/${user.id}`, user).pipe(map(response=>{
      return {
        id:response.id,
        name:response.name,
        surname:response.surname,
        nickname:response.nickname,
        picture:response.picture?.data?{
          id: response.picture.data.id,
          url_large: response.picture.data.attributes.formats.large.url,
          url_small: response.picture.data.attributes.formats.small.url,
          url_medium:response.picture.data.attributes.formats.medium.url,
          url_thumbnail:response.picture.data.attributes.formats.thumbnail.url,
        }:null
      };
    }));
  }

  public deleteUser(user:User):Observable<User>{
    return this.dataService.delete<any>(`extended-users/${user.id}`).pipe(map(response=>{
      return {
        id:response.id,
        name:response.name,
        surname:response.surname,
        nickname:response.nickname,
        picture:response.picture?.data?{
          id: response.picture.data.id,
          url_large: response.picture.data.attributes.formats.large.url,
          url_small: response.picture.data.attributes.formats.small.url,
          url_medium:response.picture.data.attributes.formats.medium.url,
          url_thumbnail:response.picture.data.attributes.formats.thumbnail.url,
        }:null
      };
    }));
  }
}
