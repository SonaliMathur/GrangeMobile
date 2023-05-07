import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventdetailsPage } from './eventdetails.page';

const routes: Routes = [
  {
    path: '',
    component: EventdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventdetailsPageRoutingModule {}
