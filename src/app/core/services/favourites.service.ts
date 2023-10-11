import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Fav } from '../interfaces/fav';
import { UserNotFoundException } from './users.service';




@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  private _favs:BehaviorSubject<Fav[]> = new BehaviorSubject<Fav[]>([]);
  public favs$:Observable<Fav[]> = this._favs.asObservable();
  
  constructor() { 

  } 

  public getAll():Observable<Fav[]>{
    return new Observable(observer=>{
      setTimeout(() => {
        let _favs:Fav[] = [
          {userId: 1},
          {userId: 3},
          {userId: 5},
        ];
        this._favs.next(_favs);
        observer.next(_favs);
        observer.complete();  
      }, 1000);
      
    });
    
  }


  public addFav(uid:number):Observable<Fav>{
    return new Observable(observer=>{
      setTimeout(() => {
        let _favs = [...this._favs.value];
        let _fav = {userId:uid};
        _favs.push(_fav);
        this._favs.next(_favs);
        observer.next(_fav);
        observer.complete();  
      }, 1000);
      
    });
  }
  public deleteFav(uid:number):Observable<Fav>{
    var _favs = [...this._favs.value];
    return new Observable(observer=>{
      setTimeout((() => {
        var index = _favs.findIndex(f=>f.userId==uid);
        if(index<0)
          observer.error(new UserNotFoundException());
        else{
          _favs = [..._favs.slice(0,index),..._favs.slice(index+1)];
          this._favs.next(_favs);
          observer.next({userId:uid});
        }
        observer.complete();
      }).bind(this), 500);
    });
  }

  public deleteAll():Observable<void>{
    return new Observable(observer=>{
      setTimeout(() => {
        this._favs.next([]);
        observer.next();
        observer.complete();  
      }, 1000);
    });
  }
  
}
