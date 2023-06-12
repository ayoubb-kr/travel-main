import { Component } from '@angular/core';
import { MissionRequest, RequestStatus } from '../model/MissionRequest.model';
import { MissionRequestService } from '../service/MissionRequest.service';
import { Status } from '../model/VisaRequest.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-table-mission',
  templateUrl: './table-mission.component.html',
  styleUrls: ['./table-mission.component.scss']
})
export class TableMissionComponent {
  requests!: MissionRequest[];
  requestDialog!: boolean;
  selectedRequests!: MissionRequest[];
  request!: MissionRequest;
  submitted!: boolean;
  RequestStatus = RequestStatus;
  statuses = Object.values(Status);
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private missionRequestService: MissionRequestService) { 
    this.selectedRequests = [];
  }

  ngOnInit() {
    this.getMissionRequests();
  }

  getMissionRequests() {
    this.missionRequestService.ListMissionreq().subscribe(data => {
      this.requests = data;
    });
  }

  deleteSelectedRequests() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
    this.selectedRequests.forEach(request => {
      this.missionRequestService.deleteMissionRequest(request.id).subscribe(response =>  {
        this.requests = this.requests.filter(val => val.id !== request.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mission Deleted', life: 3000 });
        this.getMissionRequests();
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Delete Mission', life: 3000 });
      });
      });
      this.selectedRequests = [];
    }
    });
  }

  editRequest(request: MissionRequest) {
    this.request = {...request};
    this.requestDialog = true;
  }

  deleteRequest(request: MissionRequest) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + request.id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
    this.missionRequestService.deleteMissionRequest(request.id).subscribe(() => {
      this.requests = this.requests.filter(val => val.id !== request.id);
      this.getMissionRequests();
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Mission Deleted', life: 3000});
      }, error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to Delete Mission', life: 3000});
      });
     }
   });
  }

  hideDialog() {
    this.requestDialog = false;
    this.submitted = false;
  }

  updateRequest() {
    this.submitted = true;

    if (this.request.id) {
      this.missionRequestService.updateMissionRequest(this.request).subscribe(data => {
        this.getMissionRequests();
        this.requestDialog = false;
        this.messageService.add({severity:'success', summary:'Successful', detail:'Mission Request Updated', life: 3000});
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update Mission Request', life: 3000 });
      }
    );
  }
}
}

