import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { FavsPipe } from './favs.pipe';
import { MyUppercasePipe } from './myuppercase.pipe';
import { HighlightDirective } from './highlight.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  exports:[HomePage],
  declarations: [HomePage, UserInfoComponent, FavsPipe, MyUppercasePipe, HighlightDirective]
})
export class HomePageModule {}
