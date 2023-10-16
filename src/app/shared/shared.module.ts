import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { IonicModule } from '@ionic/angular';
import { HighlightDirective } from './directives/highlight.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavsPipe } from './pipes/favs.pipe';
import { UserDetailComponent } from './components/user-detail/user-detail.component';



@NgModule({
  declarations: [
    //Directifes
    HighlightDirective, 
    //Pipes
    FavsPipe,
    //Components
    UserInfoComponent,
    UserDetailComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
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
