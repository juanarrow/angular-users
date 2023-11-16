import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { HttpClientProvider } from '../http/http-client.provider';
import { JwtService } from '../jwt.service';


@Injectable({providedIn: 'root'})
export class ApiService {
  constructor(
    private http:HttpClientProvider,
    private jwt:JwtService
  ) {
    this.http.get
  }
  
  getHeader(url:string, accept = null, contentType=null){
    var header:any = {};
    if(accept)
      header['Accept'] = accept;
    if(contentType)
      header['Content-Type']=contentType;
    if(!url.includes('auth'))
      header['Authorization']=`Bearer ${this.jwt.getToken()}`;
    return header;
  }

  getImage(url:string):Observable<any>{    
    return this.http.getImage(url);
  }

  getDataFromUrl(url:string):Observable<any>{    
    return this.http.get(url, {}, this.getHeader(url));
  }

  get(path:string, params:any = {}):Observable<any>{
    var url = `${environment.apiUrl}${path}`;
    
    return this.http.get(url, params, this.getHeader(url));
  }
  
  put(path: string, body: Object = {}): Observable<any> {
    var url = `${environment.apiUrl}${path}`;
    return this.http.put(url,body, this.getHeader(url));
  }
  
  post(path: string, body: Object = {}, content_type=null): Observable<any> {
    var url = `${environment.apiUrl}${path}`;
    return this.http.post(url,body, this.getHeader(url));
  }
   
  patch(path: string, body: Object = {}): Observable<any> {
    var url = `${environment.apiUrl}${path}`;
    return this.http.patch(url, body, this.getHeader(url));
  }

  delete(path:string, params:Object = {}): Observable<any> {
    var url = `${environment.apiUrl}${path}`;
    return this.http.delete(url, params, this.getHeader(url));
  }
}
