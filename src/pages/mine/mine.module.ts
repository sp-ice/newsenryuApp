import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinePage } from './mine';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MinePage,
  ],
  imports: [
    IonicPageModule.forChild(MinePage),
    ComponentsModule
  ],
})
export class MinePageModule {}
