import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventDescriptionPage } from './event-description.page';

const routes: Routes = [
  {
    path: '',
    component: EventDescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventDescriptionPageRoutingModule {}
