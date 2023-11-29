import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentials } from 'src/app/core/interfaces/user-credentials';
import { UserRegisterInfo } from 'src/app/core/interfaces/user-register-info';
import { PasswordValidation } from 'src/app/core/validators/password';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent  implements OnInit {

  @Output() onsubmit = new EventEmitter<UserRegisterInfo>();

  form:FormGroup|null = null;
  constructor(
    private formBuilder:FormBuilder
  ) { 
    this.form = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      name:['', [Validators.required]],
      surname:['', [Validators.required]],
      nickname:['', [Validators.required]],
      password:['', [Validators.required, PasswordValidation.passwordProto('password')]],
      confirm:['', [Validators.required, PasswordValidation.passwordProto('confirm')]]
    },{validator:[PasswordValidation.passwordMatch('password','confirm') ]});
  }

  ngOnInit() {}

  onSubmit(){
    this.onsubmit.emit(this.form?.value);
  }

  hasError(controlName:string):boolean|undefined{
    return this.form?.get(controlName)?.invalid;
  }

  hasTouched(controlName:string):boolean|undefined{
    return this.form?.get(controlName)?.touched;
  }

}
