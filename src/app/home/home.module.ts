import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { FavsPipe } from './favs.pipe';
import { MyUppercasePipe } from './myuppercase.pipe';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule
  ],
  exports:[HomePage],
  declarations: [HomePage, FavsPipe, MyUppercasePipe]
})
export class HomePageModule {}
