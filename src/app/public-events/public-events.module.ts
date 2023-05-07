import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IonicModule } from '@ionic/angular';

import { PublicEventsPageRoutingModule } from './public-events-routing.module';
import { EventinfoComponent } from '../eventinfo/eventinfo.component';
import { PublicEventsPage } from './public-events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicEventsPageRoutingModule,
    Ng2SearchPipeModule,

  ],
  declarations: [PublicEventsPage,  EventinfoComponent ],
  entryComponents: [EventinfoComponent]
})
export class PublicEventsPageModule {}
