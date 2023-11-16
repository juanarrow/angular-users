import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignmentsPageRoutingModule } from './assignments-routing.module';

import { AssignmentsPage } from './assignments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignmentsPageRoutingModule
  ],
  declarations: [AssignmentsPage]
})
export class AssignmentsPageModule {}
