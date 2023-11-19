import { Inject, Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { PaginatedUsers, User } from 'src/app/core/interfaces/user';
import { DataService } from './data.service';
import { MappingService } from './mapping.service';



export class UserNotFoundException extends Error {
  // . declare any additional properties or methods .
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(
    private dataService:DataService,
    private mapping:MappingService
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
    return this.dataService.query<any>(this.mapping.queryUsersUrl(), {}).pipe(map(this.mapping.mapUsers.bind(this.mapping)));
  }

  public getAll():Observable<PaginatedUsers>{
    // Si coincide el tipo de datos que recibo con mi interfaz
    return this.dataService.query<any>(this.mapping.queryUsersUrl(), {}).pipe(map(this.mapping.mapUsers.bind(this.mapping)),tap(users=>{
      this._users.next(users);
    }));
  }

  public getUser(id:number):Observable<User>{
    return this.dataService.get<any>(this.mapping.getUserUrl(id)).pipe(map(this.mapping.mapUser.bind(this.mapping)));
  }

  public updateUser(user:User):Observable<User>{
    return this.dataService.put<any>(this.mapping.updateUserUrl(user.id!), user).pipe(map(this.mapping.mapUser.bind(this.mapping)));
  }

  public deleteUser(user:User):Observable<User>{
    return this.dataService.delete<any>(this.mapping.deleteUserUrl(user.id!)).pipe(map(this.mapping.mapUser.bind(this.mapping)));
  }
}
