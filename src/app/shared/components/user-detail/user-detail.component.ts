import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/core/interfaces/user';

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
    }
  }
  constructor(
    private _modal:ModalController,
    private formBuilder:FormBuilder
  ) { 
    this.form = this.formBuilder.group({
      id:[null],
      name:['', [Validators.required]],
      surname:['', [Validators.required]],
      age:[0, [Validators.required]]
    })
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

}
