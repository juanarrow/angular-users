import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomePageRoutingModule } from './welcome-routing.module';
import { WelcomePage } from './welcome.page';
import {SwiperModule} from 'swiper/angular';
// import Swiper core and required modules
import SwiperCore, { EffectCoverflow, Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// install Swiper modules
SwiperCore.use([EffectCoverflow, Navigation, Pagination, Scrollbar, A11y]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomePageRoutingModule,
    SwiperModule
  ],
  declarations: [WelcomePage]
})
export class WelcomePageModule {}
