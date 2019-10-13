import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LikedPage } from './liked';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LikedPage,
  ],
  imports: [
    IonicPageModule.forChild(LikedPage),
    ComponentsModule
  ],
})
export class LikedPageModule {}
