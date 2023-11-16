import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientProvider } from './core/services/http/http-client.provider';
import { HttpClientWebProvider } from './core/services/http/http-client-web.provider';
import { AuthService } from './core/services/api/auth.service';
import { ApiService } from './core/services/api/api.service';
import { AuthStrapiService } from './core/services/api/strapi/auth-strapi.service';
import { DataService } from './core/services/api/data.service';
import { JwtService } from './core/services/jwt.service';
import { StrapiDataService } from './core/services/api/strapi/strapi-data.service';
import {TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { SharedModule } from './shared/shared.module';
import { MediaService } from './core/services/api/media.service';
import { MediaStrapiService } from './core/services/api/strapi/media-strapi.service';
import { createTranslateLoader } from './core/services/custom-translate.service';

export function MediaServiceFactory(
  api:ApiService){
    return new MediaStrapiService(api);
}
export function DataServiceFactory(
  api:ApiService){
    return new StrapiDataService(api);
} 
export function httpProviderFactory(
  http:HttpClient,
  platform:Platform) {
  return new HttpClientWebProvider(http);
}

export function AuthServiceFactory(
  jwt:JwtService,
  api:ApiService
) {
  return new AuthStrapiService(jwt, api);
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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HttpClientProvider,
      deps: [HttpClient, Platform],
      useFactory: httpProviderFactory,  
    },
    {
      provide: AuthService,
      deps: [JwtService, ApiService],
      useFactory: AuthServiceFactory,  
    },
    {
      provide: DataService,
      deps: [ApiService],
      useFactory: DataServiceFactory,  
    },
    {
      provide: MediaService,
      deps: [ApiService],
      useFactory: MediaServiceFactory,  
    }
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
