import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent  implements OnInit {

  private _user:User|undefined;
  
  @Input('user') set user(_user:User|undefined){
    this._user = _user;
  }

  @Output('clicked') clicked = new EventEmitter();

  get user():User|undefined{
    return this._user;
  }

  constructor() { }

  ngOnInit() {}

  onUserClicked(){
    this.clicked.emit(this._user);
  }

}
