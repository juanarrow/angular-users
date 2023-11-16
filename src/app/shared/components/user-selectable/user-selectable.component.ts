import { Component, Input, OnDestroy, OnInit, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonInput, IonPopover } from '@ionic/angular';
import { Subscription, last, lastValueFrom } from 'rxjs';
import { Pagination } from 'src/app/core/interfaces/data';
import { User } from 'src/app/core/interfaces/user';
import { UsersService } from 'src/app/core/services/api/users.service';

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
  pagination:Pagination = {page:0, pageSize:0, pageCount:0, total:0};

  propagateChange = (obj: any) => {}

  constructor(
    public usersSvc:UsersService
  ) { 
  }
  
  async onLoadUsers(){
    this.loadUsers("");
  }

  private async loadUsers(filter:string){
    const paginated_users = await lastValueFrom(this.usersSvc.query(filter));
    this.pagination = paginated_users.pagination;
    this.users = paginated_users.data;
  }

  private async selectUser(id:number|undefined, propagate:boolean=false){
    if(id){
      this.userSelected  = await lastValueFrom(this.usersSvc.getUser(id));
    }
    else
      this.userSelected = undefined;
    if(propagate && this.userSelected)
      this.propagateChange(this.userSelected.id);
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

  private async filter(filtering:string){
    this.loadUsers(filtering);
  }

  onFilter(evt:any){
    this.filter(evt.detail.value);
  }

  onUserClicked(popover:IonPopover, user:User){
    this.selectUser(user.id, true);
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
