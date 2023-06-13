import { Component } from '@angular/core';
import { MissionRequest, RequestStatus } from '../model/MissionRequest.model';
import { MissionRequestService } from '../service/MissionRequest.service';
import { MessageService } from 'primeng/api';
import { Visa } from '../model/Visa.model';
import { User } from '../model/User.model';
import { UserService } from '../service/user.service';
import { Status } from '../model/VisaRequest.model';

@Component({
  selector: 'app-my-missions',
  templateUrl: './my-missions.component.html',
  styleUrls: ['./my-missions.component.scss']
})
export class MyMissionsComponent {

  missionRequests!: MissionRequest[];
  missionRequest!: MissionRequest;
  submitted: boolean = false;
  updateDialog: boolean = false;
  visas!:Visa[];
  visa!: Visa;
  user!: User
  RequestStatus = RequestStatus;
  statuses = Object.values(Status);
  constructor(private messageService: MessageService, private missionRequestService: MissionRequestService , private userService: UserService) { 
  
  }  

  ngOnInit(): void {
    this.userService.getLoggedUserData().subscribe(user => {
      if (user) {
        this.user = user;
        this.getMissionByIdpass();
      } 
    });
  }

  getMissionByIdpass(): void {
    const passportId = this.user.passport.idPass;
    if (passportId) {
    this.missionRequestService.getMissionByIdpass(passportId)
    .subscribe((response: any) => {
    const missionArray: MissionRequest[] = response as MissionRequest[];
    console.log(missionArray);
    this.missionRequest = missionArray[0];
    this.missionRequests = missionArray;
    console.log('Missions: ', this.missionRequest);
    }, error => {
    console.log(error);
    });
    }
    }

    isTextareaDisabled(): boolean {
      if (!this.missionRequest.dateRet) {
        return true;
      } else {
        let current_date = new Date();
        // set the current date time to 00:00:00
        current_date.setHours(0,0,0,0);
        
        let return_date = new Date(this.missionRequest.dateRet);
        // set the return date time to 00:00:00
        return_date.setHours(0,0,0,0);
        
        // Now compare the dates only
        return current_date < return_date;
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
          this.getMissionByIdpass();
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