import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { IonicModule } from '@ionic/angular';
import { HighlightDirective } from './directives/highlight.directive';
import { FormsModule } from '@angular/forms';
import { FavsPipe } from './pipes/favs.pipe';
import { UserFormComponent } from './components/userform/userform.component';



@NgModule({
  declarations: [
    //Directifes
    HighlightDirective, 
    //Pipes
    FavsPipe,
    //Components
    UserInfoComponent,
    UserFormComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
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
    UserFormComponent
  ]
})
export class SharedModule { }
