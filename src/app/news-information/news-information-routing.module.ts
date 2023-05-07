import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsInformationPage } from './news-information.page';

const routes: Routes = [
  {
    path: '',
    component: NewsInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsInformationPageRoutingModule {}
