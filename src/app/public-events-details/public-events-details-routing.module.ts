import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicEventsDetailsPage } from './public-events-details.page';

const routes: Routes = [
  {
    path: '',
    component: PublicEventsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicEventsDetailsPageRoutingModule {}
