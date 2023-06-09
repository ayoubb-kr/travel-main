import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestMissionComponent } from './request-mission.component';
import { Step1Component } from '../step1/step1.component';
import { Step2Component } from '../step2/step2.component';
import { Step3Component } from '../step3/step3.component';


const routes: Routes = [
  {
    path: '',
    component: RequestMissionComponent,
    children: [
      {
        path: 'step1',
        component: Step1Component
      },
      {
        path: 'step2',
        component: Step2Component
      },
      {
        path: 'step3',
        component: Step3Component
      },
      {
        path: '',
        redirectTo: 'step1',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestMissionRoutingModule { }