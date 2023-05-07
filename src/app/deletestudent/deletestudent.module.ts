import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeletestudentPageRoutingModule } from './deletestudent-routing.module';

import { DeleteStudentPage } from './deletestudent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeletestudentPageRoutingModule
  ],
  declarations: [DeleteStudentPage]
})
export class DeletestudentPageModule {}
