import { Component } from '@angular/core';
import { MissionRequest, RequestStatus } from '../model/MissionRequest.model';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SharedDataService } from '../service/shareddata.service';
import { VisaService } from '../service/visa.service';
import { MissionRequestService } from '../service/MissionRequest.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component {
  missionRequest!: MissionRequest;
  RequestStatus = RequestStatus;
  diffDays!: number;
  constructor(private router: Router , private sharedDataService: SharedDataService, private missionRequestService: MissionRequestService  , private messageService: MessageService , private visaService:VisaService ) { }
  
  ngOnInit() {
    this.missionRequest = this.sharedDataService.getMissionRequest();
    this.diffDays = this.sharedDataService.getDiffDays();
    if (!this.missionRequest) {
      this.router.navigate(['app/mission/step2']);
      this.messageService.add({severity:'info', summary:'Second Step', detail: 'Visa and Mission details'})
    }
  }

  prevPage() {
    this.router.navigate(['app/mission/step2']);
    this.messageService.add({severity:'info', summary:'Second Step', detail: 'Visa and Mission details'})
  }


  addMissionRequest(): void {
    this.visaService.getVisaByIdpass(this.missionRequest.visa.passport.idPass).subscribe(visas => {
      if (visas.length > 0) {
        const visa = visas[0];
        if (this.diffDays > visa.jours) {
          this.messageService.add({severity:'warn', summary:'Warning', detail: 'The number of days is more than visa days.'});
        } else {
          visa.jours -= this.diffDays;
          this.visaService.updateVisa(visa).subscribe(updatedVisa => {
            this.missionRequestService.addMissionRequest(this.missionRequest)
              .subscribe(
                data => {
                  console.log('Mission request added successfully', data);
                  this.messageService.add({severity:'success', summary:'Success', detail:'The operation has been completed successfully'});
                  this.router.navigate(['app/table-mission']);
                },
                error => {
                  console.error('There was an error during the request', error);
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The operation Failed', life: 3000 });
                  this.router.navigate(['app/mission/step1']);
                }
              );
          });
        }
      } else {
        console.error('No visas found with the given id');
      }
    });
  }
}