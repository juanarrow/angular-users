import { Component, OnInit, ViewChild } from '@angular/core';
import { EventsParams, SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async onSlideClicked(index:number){
    this.swiper?.swiperRef.slideTo(index);
  }
  
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  slideNext(){
    this.swiper?.swiperRef.slideNext();
  }
  slidePrev(){
    this.swiper?.swiperRef.slidePrev();
  }

  onSwiper(event:any) {
  
    console.log(event);
  }
}
