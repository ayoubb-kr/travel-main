import { Component } from '@angular/core';
import { MissionRequest } from '../model/MissionRequest.model';
import { MissionRequestService } from '../service/MissionRequest.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-my-missions',
  templateUrl: './my-missions.component.html',
  styleUrls: ['./my-missions.component.scss']
})
export class MyMissionsComponent {

  missionRequests: MissionRequest[] = [];
  missionRequest: MissionRequest = new MissionRequest();
  submitted: boolean = false;
  updateDialog: boolean = false;

  constructor(private messageService: MessageService, private missionRequestService: MissionRequestService) { }  

  ngOnInit(): void {
    this.loadMissionRequests();
  }

  loadMissionRequests(): void {
    
      }

      isTextareaDisabled(): boolean {
        if (!this.missionRequest.dateRet) {
          return true;
        } else {
          return new Date() < this.missionRequest.dateRet;
        }
      }
      
  editMissionRequest(missionRequest: MissionRequest): void {
    this.missionRequest = { ...missionRequest };  
    this.updateDialog = true;
  }

  hideDialog(): void {
    this.updateDialog = false;
  }

  updateMissionRequest(): void {
    this.submitted = true;
    if (this.missionRequest.feadback) {
      this.missionRequestService.updateMissionRequest(this.missionRequest).subscribe(
        data => {
          this.loadMissionRequests();
          this.updateDialog = false;
          this.messageService.add({severity:'success', summary:'Successful', detail:'Mission Request Updated', life: 3000});
        },
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update Mission Request', life: 3000 });
        }
      );
    }
  }

}