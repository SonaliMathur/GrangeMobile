import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LecturerModalPageRoutingModule } from './lecturer-modal-routing.module';

import { LecturerModalPage } from './lecturer-modal.page';
// import { EmailModalPage } from '../email-modal/email-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LecturerModalPageRoutingModule,
  ],
  declarations: [LecturerModalPage]
})
export class LecturerModalPageModule {}
