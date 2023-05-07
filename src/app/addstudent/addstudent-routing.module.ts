import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddStudentPage } from './addstudent.page';

const routes: Routes = [
  {
    path: '',
    component: AddStudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddstudentPageRoutingModule {}
