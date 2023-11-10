import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { IonicModule } from '@ionic/angular';
import { HighlightDirective } from './directives/highlight.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavsPipe } from './pipes/favs.pipe';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { RouterModule } from '@angular/router';
import { PictureSelectableComponent } from './components/picture-selectable/picture-selectable.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { UserSelectableComponent } from './components/user-selectable/user-selectable.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import {TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../core/translate/translate';
import { HttpClient } from '@angular/common/http';




@NgModule({
  declarations: [
    //Directifes
    HighlightDirective, 
    //Pipes
    FavsPipe,
    //Components
    UserInfoComponent,
    UserDetailComponent,
    PictureSelectableComponent,
    UserItemComponent,
    UserSelectableComponent,
    LoginFormComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
      }),
  ],
  exports:[
    CommonModule, 
    IonicModule, 
    FormsModule,
    //Directifes
    HighlightDirective, 
    //Pipes
    FavsPipe,
    //Components
    UserInfoComponent,
    UserDetailComponent,
    UserItemComponent,
    UserSelectableComponent,
    LoginFormComponent,
    TranslateModule
  ]
})
export class SharedModule { }
