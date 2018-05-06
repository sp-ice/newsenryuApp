import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LikedPage } from './liked';

@NgModule({
  declarations: [
    LikedPage,
  ],
  imports: [
    IonicPageModule.forChild(LikedPage),
  ],
})
export class LikedPageModule {}
