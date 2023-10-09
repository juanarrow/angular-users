import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { IonicModule } from '@ionic/angular';
import { HighlightDirective } from './directives/highlight.directive';



@NgModule({
  declarations: [UserInfoComponent, HighlightDirective],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports:[
    UserInfoComponent, HighlightDirective
  ]
})
export class SharedModule { }
