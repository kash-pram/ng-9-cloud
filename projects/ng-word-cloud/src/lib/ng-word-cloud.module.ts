import { NgModule } from '@angular/core';
import 'jquery-tagcanvas/tagcanvas';
import { CommonModule } from '@angular/common';

import { NgWordCloudComponent } from './ng-word-cloud.component';

@NgModule({
  declarations: [NgWordCloudComponent],
  imports: [
    CommonModule
  ],
  exports: [NgWordCloudComponent]
})
export class NgWordCloudModule { }
