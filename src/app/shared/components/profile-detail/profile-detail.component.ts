import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss'],
})
export class ProfileDetailComponent  implements OnInit {

  _user:User|null = null;

  @Input('user') set user( _user:User|null){
    this._user = _user;
    if(this._user && this.form?.controls){
      this.form?.controls['name'].setValue(this.user?.name);
      this.form?.controls['surname'].setValue(this.user?.surname);
      this.form?.controls['nickname'].setValue(this.user?.nickname);
      this.form?.controls['picture'].setValue(this.user?.picture?.url_medium);
    }
  }

  get user():User|null{
    return this._user;
  }

  @Output('save') saveEvent = new EventEmitter();

  form:FormGroup;

  constructor(
    private builder:FormBuilder
  ) { 
    this.form = this.builder.group({
      picture:[''],
      name:['', [Validators.required]],
      surname:['', [Validators.required]],
      nickname:['', [Validators.required]]
    })
  }

  ngOnInit() {}

  getDirtyValues(form: FormGroup) {
    let dirtyValues:any = {};

    Object.keys(form.controls)
        .forEach(key => {
            let currentControl = form.controls[key];
            if (currentControl.dirty)
              dirtyValues[key] = currentControl.value;
        });
    return dirtyValues;
  }
  onSubmit(){
    this.saveEvent.emit(this.getDirtyValues(this.form));
    this.form.markAsPristine();
  }

}
