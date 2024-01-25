import { Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Router } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientProvider } from './core/services/http/http-client.provider';
import { HttpClientWebProvider } from './core/services/http/http-client-web.provider';
import { AuthService } from './core/services/api/auth.service';
import { ApiService } from './core/services/api/api.service';
import { StrapiAuthService } from './core/services/api/strapi/strapi-auth.service';
import { DataService } from './core/services/api/data.service';
import { JwtService } from './core/services/jwt.service';
import { StrapiDataService } from './core/services/api/strapi/strapi-data.service';
import {TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { SharedModule } from './shared/shared.module';
import { MediaService } from './core/services/api/media.service';
import { StrapiMediaService } from './core/services/api/strapi/strapi-media.service';
import { createTranslateLoader } from './core/services/custom-translate.service';
import { StrapiMappingService } from './core/services/api/strapi/strapi-mapping.service';
import { MappingService } from './core/services/api/mapping.service';
import { FirebaseService } from './core/services/firebase/firebase.service';
import { FirebaseAuthService } from './core/services/api/firebase/firebase-auth.service';
import { environment } from 'src/environments/environment';


export function MappingServiceFactory(
  backend:string){
    switch(backend){
      case 'Strapi':
        return new StrapiMappingService();
      default:
        throw new Error("Not implemented");
        
    }
}
export function MediaServiceFactory(
  backend:string,
  api:ApiService){
    switch(backend){
      case 'Strapi':
        return new StrapiMediaService(api);
      default:
        throw new Error("Not implemented");
    }
}
export function DataServiceFactory(
  backend:string,
  api:ApiService){
    switch(backend){
      case 'Strapi':
        return new StrapiDataService(api);
      default:
        throw new Error("Not implemented");
    }
} 
export function httpProviderFactory(
  http:HttpClient,
  platform:Platform) {
  return new HttpClientWebProvider(http);
}

export function AuthServiceFactory(
  backend:string,
  jwt:JwtService,
  api:ApiService,
  firebase:FirebaseService
) {
    switch(backend){
      case 'Strapi':
        return new StrapiAuthService(jwt, api);
      case 'Firebase':
        return new FirebaseAuthService(firebase);
      default:
        throw new Error("Not implemented");
    }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    SharedModule
    ],
  providers: [
    {
      provide: 'firebase-config',
      useValue:environment.firebase
    },
    {
      provide: 'backend',
      useValue:'Firebase'
    },
    {
      provide: 'home',
      useValue:'/home'
    },
    {
      provide: 'login',
      useValue:'/login'
    },
    {
      provide: 'afterLogin',
      useValue:'/home'
    },
    {
      provide: 'splash',
      useValue:'/splash'
    },
    {
      provide: MappingService,
      deps: ['backend'],
      useFactory: MappingServiceFactory
    },
   
    {
      provide: HttpClientProvider,
      deps: [HttpClient, Platform],
      useFactory: httpProviderFactory,  
    },
    {
      provide: AuthService,
      deps: ['backend',JwtService, ApiService, FirebaseService],
      useFactory: AuthServiceFactory,  
    },
    {
      provide: DataService,
      deps: ['backend', ApiService],
      useFactory: DataServiceFactory,  
    },
    {
      provide: MediaService,
      deps: ['backend', ApiService],
      useFactory: MediaServiceFactory,  
    },
    
     { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
