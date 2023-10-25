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



@NgModule({
  declarations: [
    //Directifes
    HighlightDirective, 
    //Pipes
    FavsPipe,
    //Components
    UserInfoComponent,
    UserDetailComponent,
    PictureSelectableComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
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
    UserDetailComponent
  ]
})
export class SharedModule { }
