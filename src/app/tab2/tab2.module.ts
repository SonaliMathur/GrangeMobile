import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router'; //imported router
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; //imported form
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Tab2PageRoutingModule } from './tab2-routing.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter'; //Installed this to help with search bar


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    Ng2SearchPipeModule
    // AlertController
  ],
  declarations: [Tab2Page],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab2PageModule {}
