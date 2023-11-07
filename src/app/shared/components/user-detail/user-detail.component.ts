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
      this.form.controls['age'].setValue(_user.age);
      this.form.controls['picture'].setValue(_user.picture);
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
      age:[0, [Validators.required]],
      myNumber:['', [Validators.required, numericValidator.numericProto()]],
      password:['', [Validators.required, PasswordValidation.passwordProto()]],
      confirm:['', [Validators.required, PasswordValidation.passwordProto()]]
    },{validator: [PasswordValidation.passwordMatch('password', 'confirm')]})
  }

  ngOnInit() {}

  onCancel(){
    this._modal.dismiss(null, 'cancel');
  }

  onSubmit(){
    this._modal.dismiss(this.form.value, 'ok');
  } 

  onDelete(){
    this._modal.dismiss(this.form.value, 'delete');
  }

  hasError(control:string, error:string):boolean{
    let errors = this.form.controls[control].errors;
    return errors!=null && error in errors;
  
  }

 
}
