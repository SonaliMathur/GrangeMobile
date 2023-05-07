import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModuleLocationPageRoutingModule } from './module-location-routing.module';

import { ModuleLocationPage } from './module-location.page';
import { ModalController } from '@ionic/angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModuleLocationPageRoutingModule
  ],
  declarations: [ModuleLocationPage],
  providers: [ModalController]
})
export class ModuleLocationPageModule {}
