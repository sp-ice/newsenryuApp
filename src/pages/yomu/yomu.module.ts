import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YomuPage } from './yomu';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    YomuPage,
  ],
  imports: [
    IonicPageModule.forChild(YomuPage),
    ComponentsModule
  ],
})
export class YomuPageModule {}
