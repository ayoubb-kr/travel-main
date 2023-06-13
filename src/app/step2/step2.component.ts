
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedDataService } from '../service/shareddata.service';
import { MissionRequest } from '../model/MissionRequest.model';
import { VisaService } from '../service/visa.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component {
  submitted = false;
  visaForm!: FormGroup;
  missionRequest!: MissionRequest;
  rangeDates: Date[] = [new Date(), new Date()];
  
  constructor(private router: Router , private sharedDataService: SharedDataService, private visaService: VisaService  , private messageService: MessageService ) { }
  

  onRangeDatesChanged() {
    if (this.rangeDates.length >= 2) {
      this.missionRequest.dateDep = this.rangeDates[0];
      this.missionRequest.dateRet = this.rangeDates[1];
    }
  }
  ngOnInit(): void {
    this.missionRequest = this.sharedDataService.getMissionRequest();
    if (!this.missionRequest) {
      this.router.navigate(['app/mission/step1']);
    }
  }

  confirmDetails(): void {
    this.visaService.getVisaById(this.missionRequest.visa.idVisa).subscribe(visa => {
      // If the visa doesn't exist
      if (!visa) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Visa does not exist!', life: 3000 });
        return;
      }
      // If the visa does not belong to the provided Passport ID
      if (!visa.passport || visa.passport.idPass !== this.missionRequest.passport.idPass) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The Visa does not belong to the provided Passport ID!', life: 3000 });
      } else {
        if (new Date(visa.visaExpDate) < this.missionRequest.dateDep || new Date(visa.visaExpDate) < this.missionRequest.dateRet) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Visa expiry date is before the departure or return date!', life: 3000 });
        } else {
      // Calculate the difference between departure and return dates
      const dateDep = new Date(this.missionRequest.dateDep);
      const dateRet = new Date(this.missionRequest.dateRet);
      const diffTime = Math.abs(dateRet.getTime() - dateDep.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      this.sharedDataService.setDiffDays(diffDays);

      // Update the mission request days
      this.missionRequest.days = diffDays;

      // Check with visa days
      if (diffDays > visa.jours) {
        this.messageService.add({severity:'warn', summary:'Warning', detail: 'The number of days is more than visa days.'});
      } else {
          this.sharedDataService.setMissionRequest(this.missionRequest);
          this.router.navigate(['app/mission/step3']);
          this.messageService.add({severity:'info', summary:'Last Step', detail: 'Confirmation'})
        }
      
      }}});
  }
Back(): void {
  this.router.navigate(['app/mission/step1']);
  this.messageService.add({severity:'info', summary:'First Step', detail: 'User Details'})
}
}