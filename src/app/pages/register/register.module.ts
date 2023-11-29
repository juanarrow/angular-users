import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthModule } from 'src/app/core/+state/auth/auth.module';

@NgModule({
  imports: [
    SharedModule,
    RegisterPageRoutingModule,
    AuthModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
