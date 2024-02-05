import { Injectable, inject } from '@angular/core';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { StrapiArrayResponse, StrapiResponse } from '../../../interfaces/strapi';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { PaginatedData } from '../../../interfaces/data';
import { FirebaseService } from '../../firebase/firebase.service';

export class FirebaseDataService extends DataService{

  constructor(
    protected firebase:FirebaseService
  ){
    super();
  }

  public query<T>(resource:string, params:any):Observable<PaginatedData<T>>{
    return from(this.firebase.getDocuments(resource)).pipe(map(data=>{
      return {
        data:data.map(doc=>{
          return {
            id:0,
            uuid: doc.id,
            ...doc.data
          } as T
        }),
        pagination:{
          page:0,
          pageSize:data.length,
          pageCount:1,
          total:data.length
        }
      }
    }));
  }

  public get<T>(resource:string):Observable<T>{
    return from(this.firebase.getDocument(resource.split('/')[0], resource.split('/')[1])).pipe(map(doc=>{
      return {
        id: 0,
        uuid: doc.id,
        ...doc.data
      } as T;
    }));
  }

  public post<T>(resource:string, data:any):Observable<T>{
    return from(this.firebase.createDocument(resource, data)).pipe(switchMap(doc=>this.get<T>(resource+"/"+doc)));
  }

  public put<T>(resource:string, data:any):Observable<T>{
    return from(this.firebase.updateDocument(resource.split("/")[0],resource.split("/")[1], data)).pipe(switchMap(doc=>this.get<T>(resource)));
  }

  public delete<T>(resource:string):Observable<T>{
    return this.get<T>(resource).pipe(switchMap(doc=>{
      return from(this.firebase.deleteDocument(resource.split("/")[0],resource.split("/")[1])).pipe(map(_=>doc));
    }));
    
  }
}
