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
      user: new User(), 
      passport: new Passport(), 
      visa: new Visa(), 
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
     if (!this.missionRequest.user.username || this.missionRequest.user.username === '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Username is required', life: 3000 });
      return;
    }

      // Check if visa is not empty
    if (!this.missionRequest.passport.idPass || this.missionRequest.passport.idPass === '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Visa is required', life: 3000 });
      return;
    }

    // Check if user exists
    this.userService.getUserByname(this.missionRequest.user.username).subscribe(user => {
      if (!user) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User does not exist', life: 3000 });
        return;
      }
  
      
    // Check if passport exists and if it belongs to the user
        if (!user.passport || user.passport.idPass !== this.missionRequest.passport.idPass) {
         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Passport does not belong to user or does not exist', life: 3000 });
       return;
      }
  
      this.visaService.getPassportById(this.missionRequest.passport.idPass).subscribe(passport => {
        this.missionRequest.passport.passExpDate = passport.passExpDate;
        console.log('Passport expiry date:', this.missionRequest.passport.passExpDate);
  
        // get the Visa related to this Passport
        this.visaService.getVisaByIdpass(this.missionRequest.passport.idPass).subscribe(visas => {
          if (visas && visas.length > 0) {
            this.missionRequest.visa = visas[0]; 
            this.sharedDataService.setMissionRequest(this.missionRequest);
            this.router.navigate(['app/mission/step2']);
            this.messageService.add({severity:'info', summary:'Second Step', detail: 'Visa and Mission details'})
          }
        });
      });
    });
  }
}