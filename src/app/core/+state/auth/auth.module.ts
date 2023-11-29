import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects  } from './auth.effects';
import * as fromAuth from './auth.reducer';
import { AuthFacade } from './auth.facade';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromAuth.AUTH_FEATURE_KEY,
      fromAuth.AuthReducer
    ),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthFacade],
})
export class AuthModule { }
