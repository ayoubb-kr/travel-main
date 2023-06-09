import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestMissionRoutingModule } from './request-mission-routing.module';
import { ButtonModule } from 'primeng/button';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [],
  imports: [
    CardModule,
    ButtonModule,
    CommonModule,
    RequestMissionRoutingModule
  ]
})
export class RequestMissionModule { }
