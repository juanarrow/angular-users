import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthModule } from 'src/app/core/+state/auth/auth.module';

@NgModule({
  imports: [
    SharedModule,
    LoginPageRoutingModule,
    AuthModule
    
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
