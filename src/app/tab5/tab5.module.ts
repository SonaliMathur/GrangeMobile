import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab5Page } from './tab5.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab5PageRoutingModule } from './tab5-routing.module'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { NgCalendarModule  } from 'ionic2-calendar';
// import { CalModalPage } from '../cal-modal/cal-modal.page';
// import { CalendarModule } from 'ion2-calendar';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    // CalendarModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab5Page }]),
    Tab5PageRoutingModule,
    // NgCalendarModule,
    // CalModalPage

  ],
  declarations: [Tab5Page],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab5PageModule {}
