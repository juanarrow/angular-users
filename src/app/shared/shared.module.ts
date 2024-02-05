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
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { createTranslateLoader } from '../core/services/custom-translate.service';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import { TaskInfoComponent } from './components/task-info/task-info.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskItemComponent } from './components/task-item/task-item.component';




@NgModule({
  declarations: [
    //Directifes
    HighlightDirective, 
    //Pipes
    FavsPipe,
    //Components
    UserInfoComponent,
    UserDetailComponent,
    UserItemComponent,
    TaskInfoComponent,
    TaskDetailComponent,
    TaskItemComponent,
    PictureSelectableComponent,
    UserSelectableComponent,
    LoginFormComponent,
    HeaderComponent,
    RegisterFormComponent,
    ProfileDetailComponent],
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
    TaskInfoComponent,
    TaskDetailComponent,
    TaskItemComponent,
    UserSelectableComponent,
    LoginFormComponent,
    TranslateModule,
    HeaderComponent,
    RegisterFormComponent,
    PictureSelectableComponent,
    ProfileDetailComponent
  ]
})
export class SharedModule { }
