import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent  implements OnInit {

  form:FormGroup;
  mode:"New" | "Edit" = "New";
  currentImage = new BehaviorSubject<string>("");
  currentImage$ = this.currentImage.asObservable();
  @Input('user') set user(_user:User){
    if(_user){
      this.form.controls['id'].setValue(_user.id);
      this.form.controls['name'].setValue(_user.name);
      this.form.controls['surname'].setValue(_user.surname);
      this.form.controls['age'].setValue(_user.age);
      this.mode = "Edit";
    }
  }
  
  constructor(
    private fb:FormBuilder,
    private _modal:ModalController
  ) { 
    this.form = this.fb.group({
      id:[null],
      name:['', [Validators.required]],
      surname:['', [Validators.required]],
      age:[null, [Validators.required]]
    });
  }

  ngOnInit() {

  }

  onSubmit(){
    this._modal.dismiss(this.form.value, 'ok');
  }

  onCancel(){
    this._modal.dismiss(null, 'cancel');
  }

}
