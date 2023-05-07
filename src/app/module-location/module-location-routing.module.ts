import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuleLocationPage } from './module-location.page';

const routes: Routes = [
  {
    path: '',
    component: ModuleLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleLocationPageRoutingModule {}
