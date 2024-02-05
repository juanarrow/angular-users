import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/core/interfaces/task';
import { Router } from '@angular/router';

export interface UserInfoFavClicked{
  fav:boolean | undefined;
}

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.scss'],
})
export class TaskInfoComponent  implements OnInit{

  
  @Input() task:Task | null=null;

  @Output() onCardClicked:EventEmitter<void> = new EventEmitter<void>();
  @Output() onDeleteClicked:EventEmitter<void> = new EventEmitter<void>();
  
  constructor(
    private router:Router
  ) { }
  

  ngOnInit() {}

  onCardClick(){
    this.onCardClicked.emit();
  }

  onDeleteClick(event:any){
    this.onDeleteClicked.emit();
    event.stopPropagation();
  }
}
