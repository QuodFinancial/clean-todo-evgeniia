import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GatewayService } from './gateway.service'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    GatewayService,
  ]
})
export class SharedModule { }
