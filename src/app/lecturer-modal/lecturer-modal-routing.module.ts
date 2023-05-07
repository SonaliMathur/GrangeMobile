import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LecturerModalPage } from './lecturer-modal.page';

const routes: Routes = [
  {
    path: '',
    component: LecturerModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LecturerModalPageRoutingModule {}
