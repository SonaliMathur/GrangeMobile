import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventDescriptionPageRoutingModule } from './event-description-routing.module';

import { EventDescriptionPage } from './event-description.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventDescriptionPageRoutingModule
  ],
  declarations: [EventDescriptionPage]
})
export class EventDescriptionPageModule {}
