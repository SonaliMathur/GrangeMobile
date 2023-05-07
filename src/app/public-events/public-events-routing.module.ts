import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicEventsPage } from './public-events.page';

const routes: Routes = [
  {
    path: '',
    component: PublicEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicEventsPageRoutingModule {}
