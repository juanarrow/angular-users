import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../core/interfaces/user';
import { Router } from '@angular/router';

export interface UserInfoFavClicked{
  fav:boolean | undefined;
}

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent  implements OnInit{

  
  @Input() user:User | null=null;

  @Output() onFavClicked:EventEmitter<UserInfoFavClicked> = new EventEmitter<UserInfoFavClicked>();
  @Output() onCardClicked:EventEmitter<void> = new EventEmitter<void>();
  @Output() onDeleteClicked:EventEmitter<void> = new EventEmitter<void>();
  
  constructor(
    private router:Router
  ) { }
  

  ngOnInit() {}

  onFavClick(event:any){
    this.onFavClicked.emit({
      fav:!(this.user?.fav??false) //devolvemos el estado contrario al que tenemos
    });
    event.stopPropagation();
  }

  onCardClick(){
    this.onCardClicked.emit();
  }

  onDeleteClick(event:any){
    this.onDeleteClicked.emit();
    event.stopPropagation();
  }
}
