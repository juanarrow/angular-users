import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonImg, IonModal, ModalController } from '@ionic/angular';
import { User } from 'src/app/core/interfaces/user';
import { numericValidator } from '../../../core/validators/numeric';
import { PasswordValidation } from 'src/app/core/validators/password';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent  implements OnInit {


  form:FormGroup;
  mode:'New'|'Edit' = 'New';
  @Input() set user(_user:User|null){
    if(_user){
      this.mode = 'Edit';
      this.form.controls['id'].setValue(_user.id);
      this.form.controls['name'].setValue(_user.name);
      this.form.controls['surname'].setValue(_user.surname);
      this.form.controls['picture'].setValue(_user.picture?.url_medium);
    }
  }
  constructor(
    private _modal:ModalController,
    private formBuilder:FormBuilder
  ) { 
    this.form = this.formBuilder.group({
      id:[null],
      picture:[''],
      name:['', [Validators.required]],
      surname:['', [Validators.required]],
    })
  }

  ngOnInit() {}

  onCancel(){
    this._modal.dismiss(null, 'cancel');
  }

  getDirtyValues(form: FormGroup) {
    let dirtyValues:any = {};

    Object.keys(form.controls)
        .forEach(key => {
            let currentControl = form.controls[key];
            if (currentControl.dirty)
              dirtyValues[key] = currentControl.value;
        });
    if(this.mode=='Edit')
        dirtyValues['id'] = this.form.controls['id'].value;
    return dirtyValues;
  }

  onSubmit(){

    this._modal.dismiss(this.getDirtyValues(this.form), 'ok');
  } 

  onDelete(){
    this._modal.dismiss(this.form.value, 'delete');
  }

  hasError(control:string, error:string):boolean{
    let errors = this.form.controls[control].errors;
    return errors!=null && error in errors;
  
  }

 
}
