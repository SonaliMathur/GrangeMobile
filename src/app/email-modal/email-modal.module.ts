import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailModalPageRoutingModule } from './email-modal-routing.module';

import { EmailModalPage } from './email-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EmailModalPageRoutingModule
  ],
  declarations: [EmailModalPage],
  entryComponents: [EmailModalPage]
})
export class EmailModalPageModule {}
