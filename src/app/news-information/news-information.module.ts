import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsInformationPageRoutingModule } from './news-information-routing.module';

import { NewsInformationPage } from './news-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsInformationPageRoutingModule
  ],
  declarations: [NewsInformationPage]
})
export class NewsInformationPageModule {}
