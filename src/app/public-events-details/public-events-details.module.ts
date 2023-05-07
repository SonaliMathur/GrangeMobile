import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicEventsDetailsPageRoutingModule } from './public-events-details-routing.module';

import { PublicEventsDetailsPage } from './public-events-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicEventsDetailsPageRoutingModule
  ],
  declarations: [PublicEventsDetailsPage]
})
export class PublicEventsDetailsPageModule {}
