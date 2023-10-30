import { Component, Input, OnDestroy, OnInit, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonInput, IonPopover } from '@ionic/angular';
import { Subscription, last, lastValueFrom } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { UsersService } from 'src/app/core/services/users.service';

export const USER_SELECTABLE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UserSelectableComponent),
  multi: true
};

@Component({
  selector: 'app-user-selectable',
  templateUrl: './user-selectable.component.html',
  styleUrls: ['./user-selectable.component.scss'],
  providers:[USER_SELECTABLE_VALUE_ACCESSOR]
})
export class UserSelectableComponent  implements OnInit, ControlValueAccessor {

  userSelected:User | undefined;
  disabled:boolean = true;
  users: User[] = [];

  propagateChange = (obj: any) => {}

  constructor(
    public usersSvc:UsersService
  ) { 
  }
  
  async onLoadUsers(){
    this.users = await lastValueFrom(this.usersSvc.getAll());
  }

  private async selectUser(id:number|undefined, propagate:boolean=false){
    if(id){
      this.userSelected  = await lastValueFrom(this.usersSvc.getUser(id));
    }
    else
      this.userSelected = undefined;
    if(propagate)
      this.propagateChange(this.userSelected);
  }
  
  writeValue(obj: any): void {
    this.selectUser(obj);
      
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit() {}

  private async filter(value:string){
    const query = value;
    const users = await lastValueFrom(this.usersSvc.query(query))
    this.users = users.filter(u=>u.name.toLowerCase().includes(query.toLowerCase())||u.surname.toLowerCase().includes(query.toLowerCase()));
  }

  onFilter(evt:any){
    this.filter(evt.detail.value);
  }

  onUserClicked(popover:IonPopover, user:User){
    this.selectUser(user.id);
    popover.dismiss();
  }

  clearSearch(input:IonInput){
    input.value = "";
    this.filter("");
  }

  deselect(popover:IonPopover|null=null){
    this.selectUser(undefined, true);
    if(popover)
      popover.dismiss();
  }
}
