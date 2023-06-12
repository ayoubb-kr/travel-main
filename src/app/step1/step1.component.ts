import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Passport } from '../model/Passport.model';
import { User } from '../model/User.model';
import { MissionRequest, RequestStatus } from '../model/MissionRequest.model';
import { Visa } from '../model/Visa.model';
import { MessageService } from 'primeng/api';
import { UserService } from '../service/user.service';
import { VisaService } from '../service/visa.service';
import { SharedDataService } from '../service/shareddata.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component {
  userForm: FormGroup;
  passport: Passport = new Passport();
  submitted = false;
 missionRequest!: MissionRequest;
 user!: User;
  constructor(private router: Router , private messageService: MessageService , private userService: UserService , private visaService : VisaService, private sharedDataService: SharedDataService) {
    this.userForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'passportId': new FormControl('', Validators.required),
      'passportExpiryDate': new FormControl('', Validators.required)
    });
    this.missionRequest = {
      id: 0,
      username: new User(), 
      passportId: new Passport(), 
      visaId: new Visa(), 
      dateDep: new Date(),
      dateRet: new Date(),
      days: 0,
      missionObject: '',
      departureCity: '',
      arrivalCity: '',
      status: RequestStatus.WAITING,
      budget: 0,
      feadback: ''
    }
  }

  ngOnInit(): void {
  }
  
  nextPage() {
    this.submitted = true;
     // Check if the username is not empty
     if (!this.missionRequest.username.username || this.missionRequest.username.username === '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Username is required', life: 3000 });
      return;
    }

      // Check if visa is not empty
    if (!this.missionRequest.passportId.idPass || this.missionRequest.passportId.idPass === '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Visa is required', life: 3000 });
      return;
    }

    // Check if user exists
    this.userService.getUserByname(this.missionRequest.username.username).subscribe(user => {
      if (!user) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User does not exist', life: 3000 });
        return;
      }
  
      // Check if passport exists
      if (!user.passport) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Passport does not belong to user', life: 3000 });
        return;
      }
  
      this.visaService.getPassportById(this.missionRequest.passportId.idPass).subscribe(passport => {
        this.missionRequest.passportId.passExpDate = passport.passExpDate;
        console.log('Passport expiry date:', this.missionRequest.passportId.passExpDate);
  
        // get the Visa related to this Passport
        this.visaService.getVisaByIdpass(this.missionRequest.passportId.idPass).subscribe(visa => {
          this.missionRequest.visaId = visa; 
          this.sharedDataService.setMissionRequest(this.missionRequest);
          this.router.navigate(['app/mission/step2']);
          this.messageService.add({severity:'info', summary:'Second Step', detail: 'Visa and Mission details'})
        });
      });
    });
  }
}